import * as React from "react";
import { Button, Table } from "reactstrap";
import { BaseComponent } from "src/components/BaseComponent";
//
//
export interface ISynchoDataProps {
  busy: boolean;
  //
  doSync?: () => any;
  doCheck?: () => any;
} // interface ISynchoDataProps
//
export class SynchroData extends BaseComponent<ISynchoDataProps> {
  //
  constructor(props?: any) {
    super(props);
    this.performSync = this.performSync.bind(this);
    this.performCheck = this.performCheck.bind(this);
  } // constructor
  //
  public render(): React.ReactNode {
    return (
      <Table dark={true} borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="center">
              <h2 className="center">Synchroniser les données</h2>
            </td>
          </tr>
          <tr hidden={this.props.busy}>
            <td className="center">
              <Button color="primary" onClick={this.performSync}>
                Locales!
              </Button>
            </td>
          </tr>
          <tr hidden={this.props.busy}>
            <td className="center">
              <Button color="primary" onClick={this.performCheck}>
                Export!
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  private performSync() {
    if (this.props.doSync) {
      this.props.doSync();
    }
  } // performSave
  private performCheck(){
    if (this.props.doCheck){
      this.props.doCheck();
    }
  }
} // class ImportEtudiants
