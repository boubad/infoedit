import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from './AppRouter';
import "./index.css";
import store from "./redux/InfoStore";
import registerServiceWorker from "./registerServiceWorker";
//

//
ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
