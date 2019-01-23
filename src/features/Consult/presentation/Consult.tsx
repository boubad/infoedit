import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";

import { BaseComponent } from "../../../components/BaseComponent";
import AppState from "../../../features/AppState/redux/AppState";
import Controle from "../../../features/Controle/redux/Controle";
import MatiereStat from "../../../features/Statistiques/redux/MatiereStat";
import StatusComponent from "../../AppStatus/redux/StatusComponent";
////////////////////////
export interface IConsultProps {
  hasStatus: boolean;
  hasAffectation: boolean;
  canStatMatiere: boolean;
  hasMatiere:boolean;
} // interface IMainAppProps
interface IConsultState {
  activeTab: string;
} // interface  IMainAppState
///////////////////////////
export class Consult extends BaseComponent<IConsultProps, IConsultState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "1"
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
                  <NavItem hidden={!p.hasAffectation || !p.hasMatiere}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={this.toggle.bind(this, "1")}
                    >
                      Contrôles
                    </NavLink>
                  </NavItem>
                  <NavItem hidden={!p.canStatMatiere}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={this.toggle.bind(this, "2")}
                    >
                      Matières
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1" hidden={!p.hasAffectation || !p.hasMatiere}>
                    <Controle />
                  </TabPane>
                  <TabPane tabId="2" hidden={!p.canStatMatiere}>
                    <MatiereStat />
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
