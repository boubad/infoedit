import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { initialState } from './initialState';
import { rootReducer } from './rootReducer';
//
const store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk)
    )
  )
  /*
  createStore(
      rootReducer,
      initialDataModel,
      applyMiddleware(thunk)
    );
    */
export default store;
