import * as React from "react";
import { IEtudAffectationDoc } from "../../../data/domain/DomainData";
import { BaseListComponent } from "../../../features/Common/presentation/BaseListComponent";
//
export class EtudAffectationList extends BaseListComponent<
  IEtudAffectationDoc
> {
  constructor(props?: any) {
    super(props);
  } // constructor

  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Année</th>
        <th>Semestre</th>
        <th>Groupe</th>
        <th>Photo</th>
        <th>Nom</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IEtudAffectationDoc): React.ReactNode {
    const p = this.props;
    const busy = p.busy !== undefined && p.busy !== null ? p.busy : false;
    if (busy) {
      return (
        <tr key={px.id}>
          <td>{px.anneename}</td>
          <td>{px.semestrename}</td>
          <td>{px.groupename}</td>
          <td>{this.renderPhoto(px)}</td>
          <td>
            <a
              href="#"
              onClick={this.onShowDetail.bind(this, px.etudiantid)}
              className={this.getDisabledStyle()}
            >
              {px.fullname}
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
              className={this.getDisabledStyle()}
            >
              {px.displaystartdate}
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
              className={this.getDisabledStyle()}
            >
              {px.displayenddate}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    } else {
      return (
        <tr key={px.id}>
          <td>{px.anneename}</td>
          <td>{px.semestrename}</td>
          <td>{px.groupename}</td>
          <td>{this.renderPhoto(px)}</td>
          <td>
            <a href="#" onClick={this.onShowDetail.bind(this, px.etudiantid)}>
              {px.fullname}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.displaystartdate}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.displayenddate}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    }
  } // renderOneLine

  private renderPhoto(p: IEtudAffectationDoc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    } else {
      return (
        <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
          <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
        </a>
        
      );
    }
  } // renderPhoto
} // class AffectationList
