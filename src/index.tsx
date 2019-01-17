import "bootstrap/dist/css/bootstrap.min.css";
import { ConnectedRouter } from 'connected-react-router';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Admin from "./features/Admin/redux/Admin";
import AppState from './features/AppState/redux/AppState';
import Consult from "./features/Consult/redux/Consult";
import FicheEtudiant from './features/FicheEtudiant/redux/FicheEtudiant';
import "./index.css";
import configureStore, { history } from "./redux/InfoStore";
import { initialState } from "./redux/initialState";
import registerServiceWorker from "./registerServiceWorker";
//
const store = configureStore(initialState);
//
//
const Home = () => <AppState />;
//
ReactDOM.render(
  <Provider store={store}>
   <ConnectedRouter history={history}>
   <div className="infoback">
      <Nav>
        <NavItem>
          <Link to="/">Accueil</Link>
        </NavItem> &nbsp; &nbsp;
        <NavItem>
          <Link to="/consult">Consulter</Link>
        </NavItem> &nbsp; &nbsp;
        <NavItem>
          <Link to="/admin">Administrer</Link>
        </NavItem>
      </Nav>
      <Route path="/" exact={true} component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/consult" component={Consult} />
      <Route path="/etuddetail" component={FicheEtudiant } />
    </div>
   </ConnectedRouter>
   
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
