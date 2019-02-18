import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import {
  IControleDoc,
  IEvtDoc,
  INoteDoc,
  IOption
} from "../../../data/domain/DomainData";
import { ControleEvts2 } from "./ControleEvts2";
import { ControleInfo } from "./ControleInfo";
import { ControleNotes } from "./ControleNotes";
//
interface IControleDetailProps {
  addMode: boolean;
  current: IControleDoc;
  startDate: string;
  endDate: string;
  etudAffectations: IOption[];
  currentNote: INoteDoc;
  currentEvt: IEvtDoc;
  evtAddMode: boolean;
  busy: boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onCheck?: () => void;
  //
  onNoteSelectItem?: (id: string) => void;
  onNoteFieldChanged?: (value: any, propname: string) => void;
  onNoteEditCommand?: (arg: string) => void;
  onNoteSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onNoteRemoveAttachment?: (name: string) => void;
  //
  onEvtSelectItem?: (id: string) => void;
  onEvtFieldChanged?: (value: any, propname: string) => void;
  onEvtEditCommand?: (arg: string) => void;
  onEvtSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onEvtRemoveAttachment?: (name: string) => void;
  //
  onShowDetail?: (id:string) => void;
} // interface IControleDetailProps

interface IControleDetailState {
  activeTab: string;
}
export default class ControleDetail extends BaseComponent<
  IControleDetailProps,
  IControleDetailState
> {
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
            <ControleInfo
              canVerify={true}
              addMode={p.addMode}
              current={p.current}
              startDate={p.startDate}
              endDate={p.endDate}
              busy={this.props.busy}
              onCheck={p.onCheck}
              onEditCommand={p.onEditCommand}
              onFieldChanged={p.onFieldChanged}
              onSaveAttachment={p.onSaveAttachment}
              onRemoveAttachment={p.onRemoveAttachment}
            />
          </TabPane>
          <TabPane tabId="2" hidden={p.current.notes.length < 1}>
            <ControleNotes
              addMode={false}
              current={p.currentNote}
              items={p.current.notes}
              busy={this.props.busy}
              controleName={p.current.name}
              onSelectItem={p.onNoteSelectItem}
              onFieldChanged={p.onNoteFieldChanged}
              onEditCommand={p.onNoteEditCommand}
              onSaveAttachment={p.onSaveAttachment}
              onRemoveAttachment={p.onNoteRemoveAttachment}
              onShowDetail={p.onShowDetail}
            />
          </TabPane>
          <TabPane tabId="3">
            <ControleEvts2
              addMode={p.evtAddMode}
              controleName={p.current.name}
              items={p.current.evts}
              current={p.currentEvt}
              etudAffectations={p.etudAffectations}
              busy={this.props.busy}
              onSelectItem={p.onEvtSelectItem}
              onFieldChanged={p.onEvtFieldChanged}
              onEditCommand={p.onEvtEditCommand}
              onSaveAttachment={p.onEvtSaveAttachment}
              onRemoveAttachment={p.onEvtRemoveAttachment}
              onShowDetail={p.onShowDetail}
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
} // class ControleDetail
