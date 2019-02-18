import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IAttachedDoc, IEvtDoc } from "../../../data/domain/DomainData";

export interface IFicheEtudiantEvtsProps {
  evts: IEvtDoc[];
  onShowControle?: (id:string) => void;
}
export class FicheEtudiantEvts extends BaseComponent<
  IFicheEtudiantEvtsProps
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
  private renderAttachments(p: IEvtDoc): React.ReactNode {
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
    const pp = this.props.evts;
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
            <th>Genre</th>
            <th>Remarques</th>
            <th>Pièces jointes</th>
          </tr>
    );
  } // render
  private onShowDetail(id:string, e?:any){
    if (this.props.onShowControle){
      this.props.onShowControle(id);
    }
  }// onShowDetail
  private renderOneLine(p: IEvtDoc): React.ReactNode {
    return (
      <tr key={p.id}>
        <td>
            {p.displaydate}
        </td>
        <td>{p.matierename}</td>
        <td>
            <a
              href="#"
              onClick={this.onShowDetail.bind(this, p.controleid)}
            >
             {p.controlename}
            </a>
        </td>
        <td>{p.genrestring}</td>
        <td>{p.observations}</td>
        <td>{this.renderAttachments(p)}</td>
      </tr>
    );
  } // renderOneLine
} // class BaseEtudiantItems
