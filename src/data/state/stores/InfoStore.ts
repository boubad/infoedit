import { routerMiddleware } from 'connected-react-router';
import {createBrowserHistory} from 'history';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { createRootReducer } from '../reducers/rootReducer';
//
export const history = createBrowserHistory();
//
export default function configureStore(preloadedState:any) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(
      thunk,routerMiddleware(history)))
  );
  return store;
}// configureStore
