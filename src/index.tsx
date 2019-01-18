import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import configureStore from "./redux/InfoStore";
import { initialState } from "./redux/initialState";
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
