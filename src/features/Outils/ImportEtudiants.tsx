import * as Papa from "papaparse";
import * as React from "react";
import { Button, Input, Table } from "reactstrap";
import { BaseComponent } from 'src/components/BaseComponent';
import { InputTableItemComponent } from 'src/components/InputTableItemComponent';
import { IEtudiantDoc } from 'src/data/DomainData';
//
interface IMyEvent extends EventTarget {
  target: { files: any; result: any };
}
//
export interface IImportEtudiantsProps {
  importedEtudiants: IEtudiantDoc[];
  busy: boolean;
  //
  doImport?: (data: any[]) => any;
} // interface IImportEtudiantsProps
//
interface IImportEtudiantData {
  index: number;
  lastname: string;
  firstname: string;
  email: string;
  observations: string;
} // interface IImportEtudiant
//
interface IImportEtudiantsState {
  importedEtudiants: IEtudiantDoc[];
  etuds: IImportEtudiantData[];
} // interface IImportEtudiantsState
//
export class ImportEtudiants extends BaseComponent<
  IImportEtudiantsProps,
  IImportEtudiantsState
> {
  //
  constructor(props?: any) {
    super(props);
    this.state = {
      etuds: [],
      importedEtudiants: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.fieldChanged = this.fieldChanged.bind(this);
    this.performSave = this.performSave.bind(this);
  } // constructor
  //
  public componentDidMount() {
    this.setState({
      importedEtudiants: this.props.importedEtudiants
    });
  } // componentDidMount
  public componentWillReceiveProps(nextProps: IImportEtudiantsProps) {
    const pp: any = {};
    if (nextProps.importedEtudiants !== this.props.importedEtudiants) {
      pp.importedEtudiants = nextProps.importedEtudiants;
      this.setState({
        etuds: [],
        importedEtudiants: nextProps.importedEtudiants
      });
    }
    this.setState(pp);
  } // componentWillReceiveProps
  //
  public render(): React.ReactNode {
    return (
      <Table dark={true} borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">
              <h2 className="text-center">Import CSV Etudiants</h2>
            </td>
          </tr>
          <tr>
            <td className="text-center">{this.renderInputTable()}</td>
          </tr>
          <tr hidden={this.state.importedEtudiants.length < 1}>
            <td>{this.renderFinalTable()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  private renderInputTable(): React.ReactNode {
    const busy =
      this.props.busy !== undefined && this.props.busy !== null
        ? this.props.busy
        : false;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr hidden={busy}>
            <td className="text-center">
              <Input type="file" onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td className="text-center" hidden={this.state.etuds.length < 1}>
              <Button color="success" onClick={this.performSave} hidden={busy}>
                Importer
              </Button>
            </td>
          </tr>
          <tr hidden={this.state.etuds.length < 1}>
            <td className="text-center">
              <Table dark={true} bordered={true}>
                <tbody className={this.getInfoStyle()}>
                  <tr>
                    <th>Nom de famille</th>
                    <th>Prénom(s)</th>
                    <th>Courriel</th>
                    <th>Remarques</th>
                  </tr>
                  {this.state.etuds.map(p => {
                    return this.renderOneLine(p);
                  })}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // renderInputTable
  private renderOneLine(p: IImportEtudiantData): React.ReactNode {
    return (
      <tr key={"" + p.index}>
        <td>
          <InputTableItemComponent
            index={"" + p.index}
            text={p.lastname}
            propname={"lastname"}
            busy={this.props.busy}
            onValueChanged={this.fieldChanged}
          />
        </td>
        <td>
          <InputTableItemComponent
            index={"" + p.index}
            text={p.firstname}
            propname={"firstname"}
            busy={this.props.busy}
            onValueChanged={this.fieldChanged}
          />
        </td>
        <td>
          <InputTableItemComponent
            index={"" + p.index}
            text={p.email}
            propname={"email"}
            busy={this.props.busy}
            onValueChanged={this.fieldChanged}
          />
        </td>
        <td>
          <InputTableItemComponent
            index={"" + p.index}
            text={p.observations}
            busy={this.props.busy}
            propname={"observations"}
            onValueChanged={this.fieldChanged}
          />
        </td>
      </tr>
    );
  } // renderOneLine
  private renderFinalTable(): React.ReactNode {
    return (
      <Table bordered={true} striped={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <th>ID</th>
            <th>Revision</th>
            <td>Nom</td>
          </tr>
          {this.state.importedEtudiants.map(p => {
            return this.renderFinalLine(p);
          })}
        </tbody>
      </Table>
    );
  } // renderFinalTable
  private renderFinalLine(p: IEtudiantDoc): React.ReactNode {
    return (
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.rev}</td>
        <td>{p.fullname}</td>
      </tr>
    );
  } // renderFinalLine
  private fieldChanged(sindex: string, val: any, field: string) {
    const index = parseInt(sindex, 10);
    const pp = this.state.etuds;
    const n = pp.length;
    if (index < 0 || index >= n) {
      return;
    }
    const bb: IImportEtudiantData[] = [];
    for (let i = 0; i < n; i++) {
      const p = pp[i];
      if (i === index) {
        switch (field) {
          case "lastname":
            p.lastname = val;
            break;
          case "firstname":
            p.firstname = val;
            break;
          case "email":
            p.email = val;
            break;
          case "observations":
            p.observations = val;
            break;
          default:
            break;
        } // field
      } // found
      bb.push(p);
    } // i
    this.setState({
      etuds: bb
    });
  } // fieldChanged
  private performSave() {
    if (this.props.doImport !== undefined && this.props.doImport !== null) {
      const pp = this.state.etuds;
      const bb: any[] = [];
      const n = pp.length;
      for (let i = 0; i < n; i++) {
        const p = pp[i];
        if (p.lastname.trim().length > 0 || p.firstname.trim().length > 0) {
          bb.push(p);
        }
      } // i
      if (bb.length > 0) {
        this.props.doImport(bb);
      }
    }
  } // performSave
  private handleChange(e: any) {
    const event = e as IMyEvent;
    const files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      const file = files[0];
      const fr = new FileReader();
      fr.onloadend = (ex: any) => {
        const csv = fr.result as string;
        const parsed = Papa.parse(csv, {
          header: true
        });
        this.checkdata(parsed.data);
      };
      fr.readAsText(file);
    } // files
  } // handleChange
  private checkdata(data: any[]) {
    if (data === undefined || data === null) {
      return;
    }
    const n = data.length;
    const pp: IImportEtudiantData[] = [];
    for (let i = 0; i < n; i++) {
      const p = data[i];
      if (p !== undefined && p !== null) {
        const pz = this.checkEtudiant(p);
        if (pz.lastname.length > 0 && pz.firstname.length > 0) {
          pz.index = pp.length;
          pp.push(pz);
        }
      }
    } // i
    this.setState({
      etuds: pp
    });
  } // checkData
  private checkEtudiant(p: any): IImportEtudiantData {
    const pRet: IImportEtudiantData = {
      index: 0,
      lastname: this.filterText(p.lastname, true),
      // tslint:disable-next-line:object-literal-sort-keys
      firstname: this.filterText(p.firstname),
      email: p.email,
      observations: this.filterText(p.observations)
    };
    return pRet;
  } // checkEtudiant
  private filterText(s: string, bUpper: boolean = false): string {
    let ss = s !== undefined && s !== null ? s.trim() : "";
    if (bUpper) {
      return ss.toUpperCase();
    }
    const n = ss.length;
    if (n > 0) {
      if (n > 1) {
        ss = ss.slice(0, 1).toUpperCase() + ss.slice(1, n);
      } else {
        ss = ss.toUpperCase();
      }
    } // n
    return ss;
  } // filterText
} // class ImportEtudiants
