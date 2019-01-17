import * as React from "react";
import { Table } from 'reactstrap';
import { BaseComponent } from "../../../components/BaseComponent";

export interface IStatusComponentProps {
  error: string;
  status: string;
}
export class StatusComponent extends BaseComponent<IStatusComponentProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    if (p.error.length < 1 && p.status.length < 1) {
      return null;
    }
    const errorstyle = "text-center " + this.getErrorStyle();
    const statusstyle = "text-center " + this.getStatusStyle();
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          <tr hidden={p.error.length < 1}>
            <td>
              <span className={errorstyle}>{p.error}</span>
            </td>
          </tr>
          <tr hidden={p.status.length < 1}>
            <td>
              <span className={statusstyle}>{p.status}</span>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
} // class StatusComponent
