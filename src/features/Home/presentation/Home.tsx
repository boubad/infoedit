import * as React from "react";
import { Button, Form, FormGroup, Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { ItemChoiceComponent } from "../../../components/InputChoiceComponent";
import { IOption } from "../../../data/domain/DomainData";
import LoginForm from "../../../features/Login/redux/LoginForm";
//
export interface IHomeProps {
  anneeid: string;
  annees: IOption[];
  semestreid: string;
  semestres: IOption[];
  groupeid: string;
  groupes: IOption[];
  busy: boolean;
  connected: boolean;
  //
  ValueChanged?: (val: any, propname?: string) => void;
  RefreshAll?: () => void;
  onLogout?: () => void;
} // interface IHomeProps

export class Home extends BaseComponent<IHomeProps> {
  constructor(props?: any) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  } // constructor
  public componentWillMount() {
    if (this.props.RefreshAll !== undefined && this.props.RefreshAll !== null) {
      this.props.RefreshAll();
    }
  } // componentWillMount
  public render(): React.ReactNode {
    const p = this.props;
    if (!p.connected) {
      return <LoginForm />;
    } // not connected
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
                  busy={p.busy}
                  onItemChoosen={p.ValueChanged}
                />
                <ItemChoiceComponent
                  text={p.semestreid}
                  items={p.semestres}
                  prompt="Semestre:"
                  propname="semestreid"
                  busy={p.busy}
                  onItemChoosen={p.ValueChanged}
                />
                <ItemChoiceComponent
                  text={p.groupeid}
                  items={p.groupes}
                  prompt="Groupe:"
                  propname="groupeid"
                  busy={p.busy}
                  onItemChoosen={p.ValueChanged}
                />
                <FormGroup>
                  <Button color="secondary" onClick={this.onLogout}>
                    Déconnexion!
                  </Button>
                </FormGroup>
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private onLogout(e?: any) {
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  } // onLogout
} // class Home
