import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IControleDoc, IEvtDoc } from "../../../data/DomainData";
//
export interface IFicheControleEvtsProps {
  current: IControleDoc;
  //
  onShowDetail?: (id: string) => void;
} //
//
export class FicheControleEvts extends BaseComponent<IFicheControleEvtsProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    return (
      <Table bordered={true} striped={true}>
        <tbody className={this.getInfoStyle()}>
          {this.renderTableHeader()}
          {this.props.current.evts.map(p => {
            return this.renderOneLine(p);
          })}
        </tbody>
      </Table>
    );
  } // render
  private renderLinePhoto(p: IEvtDoc): React.ReactNode {
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
        <th>Genre</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  private renderOneLine(p: IEvtDoc): React.ReactNode {
    return (
      <tr key={p.id}>
        <td>{this.renderLinePhoto(p)}</td>
        <td>
          <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
            {p.fullname}
          </a>
        </td>
        <td>{p.genrestring}</td>
        <td>{p.observations}</td>
      </tr>
    );
  } // renderOneLine
  private onShowDetail(id: string) {
    if (this.props.onShowDetail) {
      this.props.onShowDetail(id);
    }
  }
} //
