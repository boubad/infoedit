import * as moment from "moment";
import * as React from "react";
import { IEtudAffectationDoc } from "../../../data/DomainData";
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
          <td>{this.renderPhoto(px)}</td>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
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
              {moment(px.startdate).format("DD/MM/YYYY")}
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
              className={this.getDisabledStyle()}
            >
              {moment(px.enddate).format("DD/MM/YYYY")}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    } else {
      return (
        <tr key={px.id}>
          <td>{this.renderPhoto(px)}</td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.fullname}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {moment(px.startdate).format("DD/MM/YYYY")}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {moment(px.enddate).format("DD/MM/YYYY")}
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
        <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
      );
    }
  } // renderPhoto
} // class AffectationList
