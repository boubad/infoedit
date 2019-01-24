import * as React from "react";
import { SigleNamedListComponent } from '../../../features/Common/presentation/SigleNamedListComponent';

import { IDataVarDoc } from '../../../data/DomainData';

//
export class DataVarList extends SigleNamedListComponent<IDataVarDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Abbréviation</th>
        <th>Type</th>
        <th>Nom complet</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IDataVarDoc): React.ReactNode {
    const p = this.props;
    const busy = (p.busy !== undefined && p.busy !== null) ? p.busy : false;
    if (busy){
      return (
        <tr key={px.id}>
          <td>
              {px.sigle}
          </td>
          <td>
            {px.vartype}
          </td>
          <td>
              {px.name}
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
          <td>
            {px.vartype}
          </td>
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
} // class UniteList
