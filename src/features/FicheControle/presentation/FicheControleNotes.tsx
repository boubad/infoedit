import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import {
  IControleDoc,
  INoteDoc} from "../../../data/domain/DomainData";
//
export interface IFicheControleNotesProps {
  current: IControleDoc;
  //
  onShowDetail?: (id: string) => void;
} //
//
export class FicheControleNotes extends BaseComponent<
  IFicheControleNotesProps
> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    return (
      <Table bordered={true} striped={true}>
        <tbody className={this.getInfoStyle()}>
          {this.renderTableHeader()}
          {this.props.current.notes.map(p => {
            return this.renderOneLine(p);
          })}
        </tbody>
      </Table>
    );
  } // render
  private renderLinePhoto(p: INoteDoc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    }
      return (
        <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
          <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
        </a>
      );
  } // renderLinePhoto
  private renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Note</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  private renderOneLine(p: INoteDoc): React.ReactNode {
      return (
        <tr key={p.id}>
          <td>{this.renderLinePhoto(p)}</td>
          <td>
            <a
              href="#"
              onClick={this.onShowDetail.bind(this, p.etudiantid)}
            >
              {p.fullname}
            </a>
          </td>
          <td>{p.value !== null ? "" + p.value : ""}</td>
          <td>{p.observations}</td>
        </tr>
      );
  } // renderOneLine
  private onShowDetail(id: string){
      if (this.props.onShowDetail){
          this.props.onShowDetail(id);
      }
  }
} // class ItemDetail<T extends IItemDoc>
