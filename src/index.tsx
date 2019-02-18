import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./data/state/stores/InfoStore";
import { initialState } from "./data/state/stores/initialState";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
//
const store = configureStore(initialState);
//
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
