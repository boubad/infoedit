import * as React from "react";
import { IEtudiantDoc } from '../../../data/domain/DomainData';
import { BaseListComponent } from '../../../features/Common/presentation/BaseListComponent';

//
export class EtudiantList extends BaseListComponent<IEtudiantDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor

  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom de famille</th>
        <th>Prénom(s)</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IEtudiantDoc): React.ReactNode {
    const p = this.props;
    const busy = (p.busy !== undefined && p.busy !== null) ? p.busy : false;
    if (busy){
      return (
        <tr key={px.id}>
          <td>{this.renderPhoto(px)}</td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)} className={this.getDisabledStyle()}>
              {px.lastname}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)} className={this.getDisabledStyle()}>
              {px.firstname}
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
              {px.lastname}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.firstname}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    }
    
  } // renderOneLine
  protected renderPhoto(p: IEtudiantDoc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    } else {
      return (
        <a href="#" onClick={this.onSelectItem.bind(this, p.id)}>
             <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
        </a>
      );
    }
  } // renderPhoto
} // class GroupeList
