import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Link, Route } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Admin from "./features/Admin/redux/Admin";
import AppState from "./features/AppState/redux/AppState";
import Consult from "./features/Consult/redux/Consult";
import FicheControle from "./features/FicheControle/redux/FicheControle";
import FicheEtudiant from "./features/FicheEtudiant/redux/FicheEtudiant";
import { history } from "./redux/InfoStore";
//
const Home = () => <AppState />;
//
const App = () => {
  return (
    <ConnectedRouter history={history}>
      <div className="infoback">
        <Nav>
          <NavItem>
            <Link to="/">Accueil</Link>
          </NavItem>{" "}
          &nbsp; &nbsp;
          <NavItem>
            <Link to="/consult">Consulter</Link>
          </NavItem>{" "}
          &nbsp; &nbsp;
          <NavItem>
            <Link to="/admin">Administrer</Link>
          </NavItem>
        </Nav>
        <Route path="/" exact={true} component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/consult" component={Consult} />
        <Route path="/etud" component={FicheEtudiant} />
        <Route path="/controle" component={FicheControle} />
      </div>
    </ConnectedRouter>
  );
};
export default App;
