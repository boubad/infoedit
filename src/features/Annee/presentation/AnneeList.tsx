import * as React from "react";
import { IAnneeDoc } from "../../../data/domain/DomainData";
import { BaseListComponent } from "../../../features/Common/presentation/BaseListComponent";

//
export class AnneeList extends BaseListComponent<IAnneeDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor

  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Abbréviation</th>
        <th>Date début</th>
        <th>Date fin</th>
        <th>Nom complet</th>
        <th>Remarques</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IAnneeDoc): React.ReactNode {
    const p = this.props;
    const busy = p.busy !== undefined && p.busy !== null ? p.busy : false;
    if (busy) {
      return (
        <tr key={px.id}>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
              className={this.getDisabledStyle()}
            >
              {px.sigle}
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
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, px.id)}
              className={this.getDisabledStyle()}
            >
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
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.name}
            </a>
          </td>
          <td>{px.observations}</td>
        </tr>
      );
    }
  } // renderOneLine
} // class AnneeList
