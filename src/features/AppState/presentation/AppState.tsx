import * as React from "react";
import { Form, Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { ItemChoiceComponent } from '../../../components/InputChoiceComponent';
import { IOption } from '../../../data/domain/DomainData';
//
export interface IAppStateProps {
  anneeid: string;
  annees: IOption[];
  matiereid: string;
  semestreid: string;
  semestres: IOption[];
  groupeid: string;
  groupes: IOption[];
  matieres: IOption[];
  busy:boolean;
  //
  ValueChanged?: (val: any, propname?: string) => void;
} // interface IGlobalStateComponentProps
//
export class AppState extends BaseComponent<IAppStateProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    const busy = (this.props.busy !== undefined && this.props.busy !== null && this.props.busy === true) ? true: false;
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>

            <td className="text-center">
              <Form inline={true}>
              <ItemChoiceComponent
                  text={p.anneeid}
                  items={this.props.annees}
                  prompt="Année:"
                  propname="anneeid"
                  busy={busy}
                  onItemChoosen={p.ValueChanged}
                />
                <ItemChoiceComponent
                  text={p.semestreid}
                  items={p.semestres}
                  prompt="Semestre:"
                  propname="semestreid"
                  busy={busy}
                  onItemChoosen={p.ValueChanged}
                />
                <ItemChoiceComponent
                  text={p.groupeid}
                  items={p.groupes}
                  prompt="Groupe:"
                  propname="groupeid"
                  busy={busy}
                  onItemChoosen={p.ValueChanged}
                />
                <ItemChoiceComponent
                  text={p.matiereid}
                  items={p.matieres}
                  prompt="Matière:"
                  propname="matiereid"
                  busy={busy}
                  onItemChoosen={p.ValueChanged}
                />
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
} // class AppState
