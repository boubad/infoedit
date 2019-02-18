import classnames from "classnames";
import * as Papa from "papaparse";
import * as React from "react";
// tslint:disable-next-line:ordered-imports
import {
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane
} from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import {
  IEtudiantDesc,
  IEvtDoc,
  IExportEtudiantDesc,
  IMatiereDesc
} from "../../../data/domain/DomainData";
//
export interface IMatiereStatProps {
  matieresigle: string;
  descs: IEtudiantDesc[];
  busy: boolean;
  //
  showDetail?: (id: string) => void;
} // IMatiereStatProps
//
interface IMatiereStatState {
  activeTab: string;
} // interface  IMatiereStatState
//
export class MatiereStat extends BaseComponent<
  IMatiereStatProps,
  IMatiereStatState
> {
  //
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "1"
    };
    this.toggle = this.toggle.bind(this);
  } // constructor
  //
  public render(): React.ReactNode {
    return (
      <div className={this.getInfoStyle()}>
        <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={this.toggle.bind(this, "1")}
            >
              Notes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={this.toggle.bind(this, "2")}
            >
              Evènements
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={this.toggle.bind(this, "3")}
            >
              Export-Notes
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">{this.renderNotesTable()}</TabPane>
          <TabPane tabId="2">{this.renderEvtsTable()}</TabPane>
          <TabPane tabId="3">{this.renderExportNotes()}</TabPane>
        </TabContent>
      </div>
    );
  } // render
  //
  private renderNotesTable(): React.ReactNode {
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          {this.renderNotesHeader()}
          {this.props.descs.map(p => {
            return this.renderNoteLine(p);
          })}
        </tbody>
      </Table>
    );
  } //   renderNotesTable
  private renderEvtsTable(): React.ReactNode {
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          {this.renderEvtsHeader()}
          {this.props.descs.map(p => {
            return this.renderEvtLine(p);
          })}
        </tbody>
      </Table>
    );
  } //   renderEvtsTable
  private renderLinePhoto(p: IEtudiantDesc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    }
    if (this.props.busy) {
      return (
        <img src={p.url} alt={p.lastname} height={this.getThumbHeight()} />
      );
    } else {
      return (
        <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
          <img src={p.url} alt={p.lastname} height={this.getThumbHeight()} />
        </a>
      );
    }
  } // renderLinePhoto
  private renderNotesHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Note</th>
      </tr>
    );
  } // renderNotesHeader
  private renderNoteLine(p: IEtudiantDesc): React.ReactNode {
    const fullname = p.lastname + " " + p.firstname;
    let sv = "";
    const pp = p.descs ? p.descs : new Map<string, IMatiereDesc>();
    const px = pp.get(this.props.matieresigle);
    if (px) {
      sv = px.count > 0 && px.value ? "" + px.value : "";
    }
    return (
      <tr key={p.etudiantid}>
        <td>{this.renderLinePhoto(p)}</td>
        <td>
          <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
            {fullname}
          </a>
        </td>
        <td>{sv}</td>
      </tr>
    );
  } // renderNoteLine
  private renderEvtsHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Evènements</th>
      </tr>
    );
  } // renderEvtsHeader
  private renderEvtDetail(p: IEvtDoc): React.ReactNode {
    return <li key={p.id}>{p.displaydate + " " + p.genrestring}</li>;
  } // renderEvtDetail
  private renderEvtContent(p: IEtudiantDesc): React.ReactNode {
    const pp = p.descs ? p.descs : new Map<string, IMatiereDesc>();
    const px = pp.get(this.props.matieresigle);
    let evts: IEvtDoc[] = [];
    if (px) {
      evts = px.evts;
    }
    return (
      <ul>
        {evts.map(x => {
          return this.renderEvtDetail(x);
        })}
      </ul>
    );
  } // renderEvtContent
  private renderEvtLine(p: IEtudiantDesc): React.ReactNode {
    const fullname = p.lastname + " " + p.firstname;
    return (
      <tr key={p.etudiantid}>
        <td>{this.renderLinePhoto(p)}</td>
        <td>
          <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
            {fullname}
          </a>
        </td>
        <td>{this.renderEvtContent(p)}</td>
      </tr>
    );
  } // renderEvtLine
  private renderExportNotes(): React.ReactNode {
    return (
      <Form className={this.getInfoStyle()}>
        <FormGroup>
          <Input className={this.getInfoStyle()}
            type="textarea"
            value={this.getExportNotes()}
            readOnly={true}
          />
        </FormGroup>
      </Form>
    );
  } // renderExportNotes
  private getExportNotes(): string {
    const rr: IExportEtudiantDesc[] = [];
    this.props.descs.forEach(x => {
      const cur: IExportEtudiantDesc = {
        firstname: x.firstname,
        groupe: x.groupesigle,
        ident: x.ident,
        lastname: x.lastname,
        note: null
      };
      const pp = x.descs ? x.descs : new Map<string, IMatiereDesc>();
      const px = pp.get(this.props.matieresigle);
      if (px) {
        cur.note = px.value;
      }
      rr.push(cur);
    });
    const pRet =  Papa.unparse(rr);
    return pRet;
  } // getExportNotes
  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } // toggle
  private onShowDetail(id: string) {
    if (this.props.showDetail !== undefined && this.props.showDetail !== null) {
      this.props.showDetail(id);
    }
  } // onShowDetail
} // class ImportEtudiants
