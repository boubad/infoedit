import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Admin from "./features/Admin/redux/Admin";
import AppState from "./features/AppState/redux/AppState";
import Consult from "./features/Consult/redux/Consult";
//
const Home = () => <AppState />;
//
/*
const AppRouter = () => (
    <Router>
      <div className="infoback">
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/consult/">Consulter</Link>
            </li>
            <li>
              <Link to="/admin/">Administrer</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact={true} component={Home} />
        <Route path="/admin/" component={Admin} />
        <Route path="/consult/" component={Consult} />
      </div>
    </Router>
  );
  */
const AppRouter = () => (
  <Router>
    <div className="infoback">
      <Nav>
        <NavItem>
          <Link to="/">Accueil</Link>
        </NavItem> &nbsp;&nbsp;
        <NavItem>
          <Link to="/consult/">Consulter</Link>
        </NavItem> &nbsp;&nbsp;
        <NavItem>
          <Link to="/admin/">Administrer</Link>
        </NavItem>
      </Nav>
      <Route path="/" exact={true} component={Home} />
      <Route path="/admin/" component={Admin} />
      <Route path="/consult/" component={Consult} />
    </div>
  </Router>
);
export default AppRouter;
