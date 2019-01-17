import "bootstrap/dist/css/bootstrap.min.css";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import "./index.css";
import configureStore, { history } from "./redux/InfoStore";
import { initialState } from "./redux/initialState";
import registerServiceWorker from "./registerServiceWorker";
//
const store = configureStore(initialState);
//
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
