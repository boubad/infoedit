import * as React from "react";
import { DateToDisplay } from "../../../data/DataProcs";
import { IAffectationDoc } from "../../../data/DomainData";
import { BaseListComponent } from "../../../features/Common/presentation/BaseListComponent";
//
export class AffectationList extends BaseListComponent<IAffectationDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor

  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Groupe</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Observations</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(px: IAffectationDoc): React.ReactNode {
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
              {px.groupename}
            </a>
          </td>
          <td>{DateToDisplay(px.startdate)}</td>
          <td>{DateToDisplay(px.enddate)}</td>
          <td>{px.observations}</td>
        </tr>
      );
    } else {
      return (
        <tr key={px.id}>
          <td>
            <a href="#" onClick={this.onSelectItem.bind(this, px.id)}>
              {px.groupename}
            </a>
          </td>
          <td>{DateToDisplay(px.startdate)}</td>
          <td>{DateToDisplay(px.enddate)}</td>
          <td>{px.observations}</td>
        </tr>
      );
    }
  } // renderOneLine
} // class AffectationList
