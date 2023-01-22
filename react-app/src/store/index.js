import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import serverReducer from './servers';
import focusServerReducer from './focusServer';
import channelReducer from './channel';
import userReducer from './user';
import channelMessageReducer from './channelMessage';
import focusChMessageReducer from './focusChMessage';
import dmRoomsReducer from './dmRooms';


const rootReducer = combineReducers({
  session,
  servers : serverReducer,
  focusServer : focusServerReducer,
  channel : channelReducer,
  focusUser : userReducer,
  channelMessages : channelMessageReducer,
  focusChMessage : focusChMessageReducer,
  dmRooms : dmRoomsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
