import * as React from "react";
import { IControleAffectationDoc, IEvtDoc } from '../../../data/domain/DomainData';
import { BaseEtudiantItems } from './BaseEtudiantItems';

export class EtudiantEvts extends BaseEtudiantItems {
  constructor(props?: any) {
    super(props);
  }
  protected getItems(): IControleAffectationDoc[] {
    return this.props.current.evts;
  } // hasItems
  protected renderTableHeader(): React.ReactNode {
    return (
          <tr>
            <th>Date</th>
            <th>Matière</th>
            <th>Contrôle</th>
            <th>Genre</th>
            <th>Remarques</th>
            <th>Pièces jointes</th>
          </tr>
    );
  } // render
  protected renderOneLine(px: IControleAffectationDoc): React.ReactNode {
    const p:IEvtDoc = px as IEvtDoc;
    return (
      <tr key={p.id}>
        <td>
            {p.displaydate}
        </td>
        <td>{p.matierename}</td>
        <td>
            {p.controlename}
        </td>
        <td>{p.genrestring}</td>
        <td>{p.observations}</td>
        <td>{this.renderAttachments(p)}</td>
      </tr>
    );
  } // renderOneLine
} // class EtudiantEvts
