import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import {
  IControleDoc} from "../../../data/domain/DomainData";
import { FicheControleEvts } from './FicheControleEvts';
import { FicheControleInfo } from './FicheControleInfo';
import { FicheControleNotes } from './FicheControleNotes';
//
export interface IFicheControleProps {
    busy:boolean;
    current: IControleDoc;  
  //
  onShowDetail?: (id:string) => void;
} // interface IControleDetailProps

interface IFicheControleState {
  activeTab: string;
}
export class FicheControle extends BaseComponent<
IFicheControleProps,
  IFicheControleState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "1"
    };
    this.toggle = this.toggle.bind(this);
  } // constructor
  public render(): React.ReactNode {
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr>
            <td>{this.renderTabs()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private renderTabs(): React.ReactNode {
    return (
      <div className={this.getInfoStyle()}>
        <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={this.toggle.bind(this, "1")}
            >
              Infos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={this.toggle.bind(this, "2")}
            >
              Notes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={this.toggle.bind(this, "3")}
            >
              Evènements
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <FicheControleInfo
              current={this.props.current}
            />
          </TabPane>
          <TabPane tabId="2">
            <FicheControleNotes
              current={this.props.current}
              onShowDetail={this.props.onShowDetail}
            />
          </TabPane>
          <TabPane tabId="3">
            <FicheControleEvts
              current={this.props.current}
              onShowDetail={this.props.onShowDetail}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  } // render
  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } // toggle
  private renderHeader(): React.ReactNode {
    const p = this.props.current;
    const sRet = p.matierename + " " + p.displaydate + " " + p.groupename + " " + p.name;
    return (
      <div>
        <h3 className="text-center">{sRet}</h3>
      </div>
    );
  }
} // class ControleDetail
