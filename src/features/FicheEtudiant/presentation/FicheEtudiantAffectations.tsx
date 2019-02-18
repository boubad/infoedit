import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IAttachedDoc, IEtudAffectationDoc } from "../../../data/domain/DomainData";

export interface IFicheEtudiantAffectationsProps {
  affectations: IEtudAffectationDoc[];
}
export class FicheEtudiantAffectations extends BaseComponent<
  IFicheEtudiantAffectationsProps
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
  private renderAttachments(p: IEtudAffectationDoc): React.ReactNode {
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
    const pp = this.props.affectations;
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
        <th>Année</th>
        <th>Semestre</th>
        <th>Groupe</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Remarques</th>
        <th>Pièces jointes</th>
      </tr>
    );
  } // render
  private renderOneLine(p: IEtudAffectationDoc): React.ReactNode {
    return (
      <tr key={p.id}>
        <td>{p.anneename}</td>
        <td>{p.semestrename}</td>
        <td>{p.groupename}</td>
        <td>{p.displaystartdate}</td>
        <td>{p.displayenddate}</td>
        <td>{p.observations}</td>
        <td>{this.renderAttachments(p)}</td>
      </tr>
    );
  } // renderOneLine
} // class BaseEtudiantItems
