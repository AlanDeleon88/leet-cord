import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import MessageWindow from './components/ServerWindow/MessageWindow';
import DmWindow from './components/DmWindow';
import {useSelector} from 'react-redux'
import SplashPage from './components/SplashPage';
import ExploreServer from './components/ExploreServer';

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
      {user && <ServerNavBar />} {/* only show up if user is logged in*/}
      <Switch>
        <ProtectedRoute path='/server/:serverId/'>
        {user && <ServerWindow />}
        </ProtectedRoute>
        <ProtectedRoute path='/explore'>
            <ExploreServer />
        </ProtectedRoute>


        {user ?
          (
            <ProtectedRoute path= {`/dm`}>
              <DmWindow />
            </ProtectedRoute>
            //test merege
            // <Redirect to={`/${user.username}`}/>
          )
          :
          (
            <Route path = '/' exact={true}>
              <SplashPage />
            </Route>
          )

        }

        <ProtectedRoute path= '/debug-forms' exact={true}>
          Add debuging forms here for creating servers/channels/messages/edit
          <DebugForms />

        </ProtectedRoute>

        <ProtectedRoute path='/'>
          <Redirect to={'/dm'}/>
        </ProtectedRoute>

      </Switch>

     </div>
    </BrowserRouter>
  );
}

export default App;
