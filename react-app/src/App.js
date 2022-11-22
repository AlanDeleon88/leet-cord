import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ServerNavBar from './components/ServerNavBar';
import DebugForms from './components/DebugForms/DebugForms';
import ServerWindow from './components/ServerWindow';
import {useSelector} from 'react-redux'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
     <div className='main'>
     {/* {user && <NavBar />} code to only render nav bar when logged in*/}

      <NavBar />
      {user && <ServerNavBar />} {/* only show up if user is logged in*/}
      <Switch>
        <Route path='/server/:serverId'>
        {user && <ServerWindow />}
        </Route>
        <Route path ={`/${user.username}/dm`}>
            <h1>TEST RENDER</h1>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
        </ProtectedRoute>
        <ProtectedRoute path= '/debug-forms' exact={true}>
          Add debuging forms here for creating servers/channels/messages
          <DebugForms />

        </ProtectedRoute>
        {/* code needed here to redirect to a log in page if user not signed in. change to main page later. maybe redirect the user to dm message window if they are new user. */}
        {/* {user ? (
          <Route path="/" exact={true}>
            <HomeFeed />
          </Route>
        ) : (
          <Route path="/" exact={true}>
            <LoginPage />
          </Route>
        )} */}
      </Switch>

     </div>
    </BrowserRouter>
  );
}

export default App;
