import * as React from "react";
import { IControleAffectationDoc, INoteDoc } from '../../../data/DomainData';
import { BaseEtudiantItems } from "./BaseEtudiantItems";

export class EtudiantNotes extends BaseEtudiantItems {
  constructor(props?: any) {
    super(props);
  }
  protected getItems(): IControleAffectationDoc[] {
    return this.props.current.notes;
  } // hasItems
  protected renderTableHeader(): React.ReactNode {
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
  protected renderOneLine(px: IControleAffectationDoc): React.ReactNode {
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
} // class EtudiantNotes
