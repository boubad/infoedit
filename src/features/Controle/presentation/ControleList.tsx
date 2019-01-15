import * as React from "react";
import { IControleDoc } from '../../../data/DomainData';
import { BaseListComponent } from '../../../features/Common/presentation/BaseListComponent';

//
export class ControleList extends BaseListComponent<IControleDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor

  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Date</th>
        <th>Nom</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IControleDoc): React.ReactNode {
    const p = this.props;
    const busy = (p.busy !== undefined && p.busy !== null) ? p.busy : false;
    if (busy){
      return (
        <tr key={px.id}>
          <td>
             <a href="#" onClick={this.onSelectItem.bind(this, px.id)} className={this.getDisabledStyle()}>
                {px.displaydate}
            </a>
          </td>
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
                {px.displaydate}
            </a>
          </td>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)} >
              {px.name}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    }
    
  } // renderOneLine
} // class GroupeList
