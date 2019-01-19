import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IEtudiantDoc } from "../../../data/DomainData";
import { FicheEtudiantAffectations } from "./FicheEtudiantAffectations";
import { FicheEtudiantEvts } from "./FicheEtudiantEvts";
import { FicheEtudiantInfo } from "./FicheEtudiantInfo";
import { FicheEtudiantNotes } from "./FicheEtudiantNotes";
//
export interface IFicheEtudiantProps {
  current: IEtudiantDoc;
  busy: boolean;
  //
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  onShowControle?: (id: string) => void;
} // interface IBaseInfoComponentProps<T>
//
interface IFicheEtudiantState {
  activeTab: string;
}
export class FicheEtudiant extends BaseComponent<
  IFicheEtudiantProps,
  IFicheEtudiantState
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
    const p = this.props;
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
          <NavItem hidden={this.props.current.notes.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={this.toggle.bind(this, "2")}
            >
              Notes
            </NavLink>
          </NavItem>
          <NavItem hidden={this.props.current.evts.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={this.toggle.bind(this, "3")}
            >
              Evènements
            </NavLink>
          </NavItem>
          <NavItem hidden={this.props.current.affectations.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "4"
              })}
              onClick={this.toggle.bind(this, "4")}
            >
              Affectations
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <FicheEtudiantInfo
              current={p.current}
              busy={p.busy}
              onSaveAttachment={p.onSaveAttachment}
              onRemoveAttachment={p.onRemoveAttachment}
              onSetAvatar={p.onSetAvatar}
            />
          </TabPane>
          <TabPane tabId="2" hidden={this.props.current.notes.length < 1}>
            <FicheEtudiantNotes
              notes={p.current.notes}
              onShowControle={this.props.onShowControle}
            />
          </TabPane>
          <TabPane tabId="3" hidden={this.props.current.evts.length < 1}>
            <FicheEtudiantEvts
              evts={p.current.evts}
              onShowControle={this.props.onShowControle}
            />
          </TabPane>
          <TabPane
            tabId="4"
            hidden={this.props.current.affectations.length < 1}
          >
            <FicheEtudiantAffectations
              affectations={this.props.current.affectations}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  } // render
  private renderPhoto(): React.ReactNode {
    const p = this.props.current;
    if (p.url.length > 0) {
      return <img src={p.url} alt={p.fullname} height={this.getImgHeight()} />;
    } else {
      return null;
    }
  } // renderPhoto
  private renderHeader(): React.ReactNode {
    const p = this.props.current;
    return (
      <div>
        {this.renderPhoto()}
        <h3 className="text-center">{p.fullname}</h3>
      </div>
    );
  }
  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } // toggle
} // class EtudiantDetail
