import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IAttachedDoc, INoteDoc } from "../../../data/DomainData";

export interface IFicheEtudiantNotesProps {
  notes: INoteDoc[];
}
export class FicheEtudiantNotes extends BaseComponent<
  IFicheEtudiantNotesProps
> {
  constructor(props?: any) {
    super(props);
  }
  public render(): React.ReactNode {
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td>{this.renderMainTable()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private renderAttachments(p: INoteDoc): React.ReactNode {
    return (
      <ul>
        {p.attachments.map(x => {
          return this.renderAttachment(x);
        })}
      </ul>
    );
  }
  private renderAttachment(p: IAttachedDoc): React.ReactNode {
    return (
      <li key={p.name}>
        <a href={p.url} target="_blank">
          {p.name}
        </a>
      </li>
    );
  } // renderAttachment
  private renderMainTable(): React.ReactNode {
    const pp = this.props.notes;
    if (pp.length < 1) {
      return null;
    }
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          {this.renderTableHeader()}
          {pp.map(p => {
            return this.renderOneLine(p);
          })}
        </tbody>
      </Table>
    );
  } // render
  private renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Date</th>
        <th>Matière</th>
        <th>Contrôle</th>
        <th>Note</th>
        <th>Remarques</th>
        <th>Pièces jointes</th>
      </tr>
    );
  } // renderTable
  private renderOneLine(px: INoteDoc): React.ReactNode {
    const p = px as INoteDoc;
    return (
      <tr key={p.id}>
        <td>{p.displaydate}</td>
        <td>{p.matierename}</td>
        <td>{p.controlename}</td>
        <td>{p.value !== null ? "" + p.value : ""}</td>
        <td>{p.observations}</td>
        <td>{this.renderAttachments(p)}</td>
      </tr>
    );
  } // renderOneLine
} // class BaseEtudiantItems
