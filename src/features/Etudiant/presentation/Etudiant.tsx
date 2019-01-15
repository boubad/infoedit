import * as React from "react";
import { Form, Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { StatusChoiceComponent } from '../../../components/StatusChoiceComponent';
import { IEtudiantDoc } from '../../../data/DomainData';
import EtudiantDetail from "./EtudiantDetail";
import { EtudiantList } from "./EtudiantList";
//
export interface IEtudiantsProps {
  addMode: boolean;
  current: IEtudiantDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IEtudiantDoc[];
  busy:boolean;
  status:string;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  onStatusChanged?: (status:string) => void;
  //
  createItem?: () => void;
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
}
//
export class Etudiant extends BaseComponent<IEtudiantsProps> {
  constructor(props?: any) {
    super(props);
    this.onStatusChanged = this.onStatusChanged.bind(this);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    let hasDetail = p.addMode;
    if (!hasDetail) {
      hasDetail = p.current.rev.length > 0;
    }
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2} className="text-center">
              <h2 className="text-center">Etudiants</h2>
            </td>
          </tr>
          <tr>
            <td className="text-center" colSpan={2}>
                <Form inline={true}>
                  <StatusChoiceComponent 
                    text = {this.props.status}
                    prompt = {"Etat:"}
                    propname={"status"}
                    busy = {this.props.busy}
                    onItemChoosen ={this.onStatusChanged}
                  />
                </Form>
            </td>
          </tr>
          <tr>
            <td>
              <EtudiantList
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
            <td hidden={!hasDetail}>
              <EtudiantDetail
                addMode={p.addMode}
                current={p.current}
                busy={this.props.busy}
                onFieldChanged={p.onFieldChanged}
                onEditCommand={p.onEditCommand}
                onSaveAttachment={p.onSaveAttachment}
                onRemoveAttachment={p.onRemoveAttachment}
                onSetAvatar={p.onSetAvatar}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private onStatusChanged(val:any, propname:string){
    if (this.props.onStatusChanged !== undefined && this.props.onStatusChanged !== null){
      this.props.onStatusChanged(val);
    }
  }
} // class Etudiants
