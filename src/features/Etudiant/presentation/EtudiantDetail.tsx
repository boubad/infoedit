import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { IEtudiantDoc } from '../../../data/domain/DomainData';
import { EtudiantAffectations } from './EtudiantAffectations';
import { EtudiantEvts } from "./EtudiantEvts";
import { EtudiantInfo } from "./EtudiantInfo";
import { EtudiantNotes } from "./EtudiantNotes";
//
export interface IEtudiantDetailProps {
  addMode: boolean;
  current: IEtudiantDoc;
  busy:boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  onSelectCurrent?: (id:string) => void;
} // interface IBaseInfoComponentProps<T>
//
interface IEtudiantDetailState {
  activeTab: string;
}
export default class EtudiantDetail extends BaseComponent<
  IEtudiantDetailProps,
  IEtudiantDetailState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    this.toggle = this.toggle.bind(this);
  } // constructor
  public render(): React.ReactNode {
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
          <NavItem hidden={p.current.notes.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={this.toggle.bind(this, "2")}
            >
              Notes
            </NavLink>
          </NavItem>
          <NavItem hidden={p.current.evts.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={this.toggle.bind(this, "3")}
            >
              Evènements
            </NavLink>
          </NavItem>
          <NavItem hidden={p.current.affectations.length < 1}>
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
            <EtudiantInfo
              addMode={p.addMode}
              current={p.current}
              busy={p.busy}
              onFieldChanged={p.onFieldChanged}
              onEditCommand={p.onEditCommand}
              onSaveAttachment={p.onSaveAttachment}
              onRemoveAttachment={p.onRemoveAttachment}
              onSetAvatar={p.onSetAvatar}
            />
          </TabPane>
          <TabPane tabId="2" hidden={p.current.notes.length < 1}>
            <EtudiantNotes busy={p.busy} current={p.current} />
          </TabPane>
          <TabPane tabId="3" hidden={p.current.evts.length < 1}>
            <EtudiantEvts busy={p.busy} current={p.current} />
          </TabPane>
          <TabPane tabId="4" hidden={p.current.affectations.length < 1}>
            <EtudiantAffectations busy={p.busy} current={p.current} />
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
} // class EtudiantDetail
