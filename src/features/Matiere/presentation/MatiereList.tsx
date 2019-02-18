import * as React from "react";
import { IMatiereDoc } from '../../../data/domain/DomainData';
import { SigleNamedListComponent } from '../../../features/Common/presentation/SigleNamedListComponent';
//
export class MatiereList extends SigleNamedListComponent<IMatiereDoc>{
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Abbréviation</th>
        <th>Unité</th>
        <th>Nom complet</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IMatiereDoc): React.ReactNode {
    const p = this.props;
    const busy = (p.busy !== undefined && p.busy !== null) ? p.busy : false;
    if (busy){
      return (
        <tr key={px.id}>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)} className={this.getDisabledStyle()}>
              {px.sigle}
            </a>
          </td>
          <td>{px.unitename}</td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)} className={this.getDisabledStyle()}>
              {px.name}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    } else {
      return (
        <tr key={px.id}>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.sigle}
            </a>
          </td>
          <td>{px.unitename}</td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.name}
            </a>
          </td>
          <td className="bordered">{px.observations}</td>
        </tr>
      );
    }
  } // renderOneLine
} // class MatiereList 
