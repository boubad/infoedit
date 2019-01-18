import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Link, Route } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Admin from "./features/Admin/redux/Admin";
import Consult from "./features/Consult/redux/Consult";
import FicheControle from "./features/FicheControle/redux/FicheControle";
import FicheEtudiant from "./features/FicheEtudiant/redux/FicheEtudiant";
import Home from './features/Home/redux/Home';
import { history } from "./redux/InfoStore";
import { ROUTE_ADMIN, ROUTE_CONSULT, ROUTE_CONTROLE, ROUTE_ETUD, ROUTE_HOME } from './Routes';
//
const App = () => {
  return (
    <ConnectedRouter history={history}>
      <div className="infoback">
        <Nav>
          <NavItem>
            <Link to={ROUTE_HOME}>Accueil</Link>
          </NavItem>{" "}
          &nbsp; &nbsp;
          <NavItem>
            <Link to={ROUTE_CONSULT}>Consulter</Link>
          </NavItem>{" "}
          &nbsp; &nbsp;
          <NavItem>
            <Link to={ROUTE_ADMIN}>Administrer</Link>
          </NavItem>
        </Nav>
        <Route path={ROUTE_HOME} exact={true} component={Home} />
        <Route path={ROUTE_ADMIN} component={Admin} />
        <Route path={ROUTE_CONSULT} component={Consult} />
        <Route path={ROUTE_ETUD} component={FicheEtudiant} />
        <Route path={ROUTE_CONTROLE} component={FicheControle} />
      </div>
    </ConnectedRouter>
  );
};
export default App;
