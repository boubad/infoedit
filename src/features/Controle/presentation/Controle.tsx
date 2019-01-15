import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { IControleDoc, IEvtDoc, INoteDoc, IOption } from '../../../data/DomainData';
import ControleDetail from "./ControleDetail";
import { ControleList } from "./ControleList";
//
export interface IControlesProps {
  addMode: boolean;
  current: IControleDoc;
  startDate: string;
  endDate: string;
  etudAffectations: IOption[];
  currentNote: INoteDoc;
  currentEvt: IEvtDoc;
  evtAddMode: boolean;
  //
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IControleDoc[];
  busy:boolean;
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
  createItem?: () => void;
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
}
//
export class Controle extends BaseComponent<IControlesProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    let hasDetail = p.addMode;
    if (!hasDetail) {
      hasDetail = p.current.rev.length > 0;
    }
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2} className="text-center">
              <h2 className="text-center">Contrôles</h2>
            </td>
          </tr>
          <tr>
            <td className='top'>
              <ControleList
                addMode={p.addMode}
                currentPage={p.currentPage}
                displayPages={p.displayPages}
                pagesCount={p.pagesCount}
                items={p.items}
                busy={this.props.busy}
                refresh={p.refresh}
                gotoPage={p.gotoPage}
                selectItem={p.selectItem}
                createItem={p.createItem}
              />
            </td>
            <td className="top" hidden={!hasDetail}>
              <ControleDetail
                addMode={p.addMode}
                current={p.current}
                startDate={p.startDate}
                endDate={p.endDate}
                etudAffectations={p.etudAffectations}
                currentNote={p.currentNote}
                currentEvt={p.currentEvt}
                evtAddMode={p.evtAddMode}
                busy={this.props.busy}
                onFieldChanged={p.onFieldChanged}
                onEditCommand={p.onEditCommand}
                onSaveAttachment={p.onSaveAttachment}
                onRemoveAttachment={p.onRemoveAttachment}
                onCheck={p.onCheck}
                onNoteSelectItem={p.onNoteSelectItem}
                onNoteFieldChanged={p.onNoteFieldChanged}
                onNoteSaveAttachment={p.onNoteSaveAttachment}
                onNoteRemoveAttachment={p.onNoteRemoveAttachment}
                onEvtEditCommand={p.onEvtEditCommand}
                onEvtFieldChanged={p.onEvtFieldChanged}
                onEvtRemoveAttachment={p.onEvtRemoveAttachment}
                onEvtSaveAttachment={p.onEvtSaveAttachment}
                onEvtSelectItem={p.onEvtSelectItem}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
} // class Controles
