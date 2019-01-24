import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";

import { BaseComponent } from "../../../components/BaseComponent";
import Affectation from "../../../features/Affectation/redux/Affectation";
import Annee from "../../../features/Annee/redux/Annee";
import AppState from "../../../features/AppState/redux/AppState";
import DataVar from "../../../features/DataVar/redux/DataVar";
import EtudAffectation from "../../../features/EtudAffectation/redux/EtudAffectation";
import Etudiant from "../../../features/Etudiant/redux/Etudiant";
import Groupe from "../../../features/Groupe/redux/Groupe";
import Matiere from "../../../features/Matiere/redux/Matiere";
import ChangeStatus from "../../../features/Outils/redux/ChangeStatus";
import ImportEtudiants from "../../../features/Outils/redux/ImportEtudiants";
import SynchroData from "../../../features/Outils/redux/SynchroData";
import Semestre from "../../../features/Semestre/redux/Semestre";
import Unite from "../../../features/Unite/redux/Unite";
import StatusComponent from "../../AppStatus/redux/StatusComponent";
////////////////////////
export interface IAdminProps {
  hasStatus: boolean;
  canAffectations: boolean;
  canEtudAffectations: boolean;
  canChangeStatus: boolean;
} // interface IMainAppProps
interface IAdminState {
  activeTab: string;
} // interface  IMainAppState
///////////////////////////
export class Admin extends BaseComponent<IAdminProps, IAdminState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "5"
    };
    this.toggle = this.toggle.bind(this);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">
              <AppState />
            </td>
          </tr>
          <tr hidden={!p.hasStatus}>
            <td>
              <StatusComponent />
            </td>
          </tr>
          <tr>
            <td>
              <div className={this.getInfoStyle()}>
                <Nav tabs={true}>
                  <NavItem hidden={!p.canEtudAffectations}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "8"
                      })}
                      onClick={this.toggle.bind(this, "8")}
                    >
                      Etud-Affectations
                    </NavLink>
                  </NavItem>
                  <NavItem hidden={!p.canAffectations}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "7"
                      })}
                      onClick={this.toggle.bind(this, "7")}
                    >
                      Affectations
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "5"
                      })}
                      onClick={this.toggle.bind(this, "5")}
                    >
                      Années
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "6"
                      })}
                      onClick={this.toggle.bind(this, "6")}
                    >
                      Etudiants
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={this.toggle.bind(this, "1")}
                    >
                      Matières
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={this.toggle.bind(this, "2")}
                    >
                      Unités
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={this.toggle.bind(this, "3")}
                    >
                      Groupes
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4"
                      })}
                      onClick={this.toggle.bind(this, "4")}
                    >
                      Semestres
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "10"
                      })}
                      onClick={this.toggle.bind(this, "10")}
                    >
                      Import-CSV
                    </NavLink>
                  </NavItem>
                  <NavItem hidden={!this.props.canChangeStatus}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "11"
                      })}
                      onClick={this.toggle.bind(this, "11")}
                    >
                      Outils
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "12"
                      })}
                      onClick={this.toggle.bind(this, "12")}
                    >
                      Sync
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "13"
                      })}
                      onClick={this.toggle.bind(this, "13")}
                    >
                      Variables
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Matiere />
                  </TabPane>
                  <TabPane tabId="2">
                    <Unite />
                  </TabPane>
                  <TabPane tabId="3">
                    <Groupe />
                  </TabPane>
                  <TabPane tabId="4">
                    <Semestre />
                  </TabPane>
                  <TabPane tabId="5">
                    <Annee />
                  </TabPane>
                  <TabPane tabId="6">
                    <Etudiant />
                  </TabPane>
                  <TabPane tabId="7" hidden={!p.canAffectations}>
                    <Affectation />
                  </TabPane>
                  <TabPane tabId="8" hidden={!p.canEtudAffectations}>
                    <EtudAffectation />
                  </TabPane>
                  <TabPane tabId="10">
                    <ImportEtudiants />
                  </TabPane>
                  <TabPane tabId="11">
                    <ChangeStatus />
                  </TabPane>
                  <TabPane tabId="12">
                    <SynchroData />
                  </TabPane>
                  <TabPane tabId="13">
                    <DataVar />
                  </TabPane>
                </TabContent>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } // toggle
}
