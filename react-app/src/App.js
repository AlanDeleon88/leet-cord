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

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
      <ServerNavBar /> {/* only show up if user is logged in*/}
      <Switch>
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
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path= '/debug-forms' exact={true}>
          Add debuging forms here for creating servers/channels/messages
          <DebugForms />

        </ProtectedRoute>
        {/* {user ? ( code needed here to redirect to a log in page if user not signed in.
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
