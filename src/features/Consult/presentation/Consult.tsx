import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";

import { BaseComponent } from "../../../components/BaseComponent";
import AppState from "../../../features/AppState/redux/AppState";
import StatusComponent from "../../../features/Common/redux/StatusComponent";
import Controle from '../../../features/Controle/redux/Controle';
////////////////////////
export interface IConsultProps {
  hasStatus: boolean;
  hasAffectation: boolean;
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
                <NavItem hidden={!p.hasAffectation}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={this.toggle.bind(this, "1")}
                    >
                      Contrôles
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1" hidden={!p.hasAffectation}>
                    <Controle />
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
