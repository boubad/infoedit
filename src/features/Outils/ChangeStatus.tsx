import * as React from "react";
// tslint:disable-next-line:ordered-imports
import { Button, Form, Table } from "reactstrap";
import { BaseComponent } from '../../components/BaseComponent';
import { StatusChoiceComponent } from '../../components/StatusChoiceComponent';
import { ETUDIANT_STATUS_BUSY, ETUDIANT_STATUS_DEMISSION, ETUDIANT_STATUS_DONE, ETUDIANT_STATUS_FREE } from '../../data/DataProcs';
import { IEtudAffectationDoc } from '../../data/DomainData';
//
export interface IChangeStatusProps {
  affectations: IEtudAffectationDoc[];
  status: string;
  anneename: string;
  semestrename: string;
  busy: boolean;
  //
  refresh?: () => void;
  changeStatus?: (status: string) => void;
} // interface IImportEtudiantsProps
//
interface IChangeStatusState {
  status: string;
} // interface  IChangeStatusState
//
export class ChangeStatus extends BaseComponent<
  IChangeStatusProps,
  IChangeStatusState
> {
  //
  constructor(props?: any) {
    super(props);
    this.state = {
      status: ""
    };
    this.statusChanged = this.statusChanged.bind(this);
    this.performSave = this.performSave.bind(this);
  } // constructor
  //
  public componentWillMount() {
    if (this.props.refresh !== undefined && this.props.refresh !== null) {
      this.props.refresh();
    }
  } // componentWillMount

  public componentDidMount() {
    this.setState({
      status: this.props.status
    });
  } // componentDidMount
  public componentWillReceiveProps(nextProps: IChangeStatusProps) {
    if (nextProps.status !== this.props.status) {
      this.setState({
        status: nextProps.status
      });
    }
  } // componentWillReceiveProps
  //
  public render(): React.ReactNode {
    if (this.props.affectations.length < 1) {
      return null;
    }
    const stitle: string =
      "Etat étudiants " + this.props.anneename + " " + this.props.semestrename;
    return (
      <Table dark={true} borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">
              <h2 className="text-center">{stitle}</h2>
            </td>
          </tr>
          <tr>
            <td className="center">
              <Form inline={true} className={this.getInfoStyle()}>
                <StatusChoiceComponent
                  text={this.state.status}
                  prompt={"Etat:"}
                  propname={"status"}
                  busy={this.props.busy}
                  onItemChoosen={this.statusChanged}
                />
              </Form>
            </td>
          </tr>
          <tr>
            <td className="text-center">
              <Button color="success" onClick={this.performSave}>
                Modifier
              </Button>
            </td>
          </tr>
          <tr>
            <td className="text-center">{this.renderTable()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  private renderTable(): React.ReactNode {
    return (
      <Table bordered={true} striped={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Groupe</th>
            <th>Etat</th>
          </tr>
          {this.props.affectations.map(p => {
            return this.renderFinalLine(p);
          })}
        </tbody>
      </Table>
    );
  } // renderFinalTable
  private renderFinalLine(p: IEtudAffectationDoc): React.ReactNode {
    return (
      <tr key={p.id}>
        <td>{this.renderPhoto(p)}</td>
        <td>{p.fullname}</td>
        <td>{p.groupename}</td>
        <td>{this.convertStatus(p.etudiantStatus)}</td>
      </tr>
    );
  } // renderFinalLine
  private renderPhoto(p: IEtudAffectationDoc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    } else {
      return <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />;
    }
  } // renderPhoto
  private statusChanged(val: any) {
    this.setState({
      status: val
    });
  } // fieldChanged
  private performSave() {
    if (
      this.props.changeStatus !== undefined &&
      this.props.changeStatus !== null
    ) {
      this.props.changeStatus(this.state.status);
    }
  } // performSave
  private convertStatus(s:string) : string {
    switch (s){
        case ETUDIANT_STATUS_FREE:
            return "Non assigne";
        case ETUDIANT_STATUS_BUSY:
            return "Assigné";
        case ETUDIANT_STATUS_DONE:
            return "Fermé";
        case ETUDIANT_STATUS_DEMISSION:
            return "Démission";
        default:
            return "INCONNU";
    }
  }// converStatus
} // class ImportEtudiants
