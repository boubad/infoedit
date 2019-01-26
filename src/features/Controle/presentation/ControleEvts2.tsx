import * as React from "react";
import { Button, Form, Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { BlobInfo } from "../../../components/BlobInfo";
import { EditCommandsComponent } from "../../../components/EditCommandsComponent";
import { ItemChoiceComponent } from "../../../components/InputChoiceComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputGenreEvtComponent } from "../../../components/InputGenreEvtComponent";
import { InputItemComponent } from "../../../components/InputItemComponent";
import {
  IEvtDoc,
  IOption
} from "../../../data/DomainData";
//
export interface IControleEvtsProps {
  addMode: boolean;
  controleName: string;
  items: IEvtDoc[];
  current: IEvtDoc;
  etudAffectations: IOption[];
  busy: boolean;
  //
  onSelectItem?: (id: string) => void;
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onShowDetail?: (id:string) => void;
} // IControleEvtsProps
//
const tabJustifie:IOption[] = [
  {id:"",text:""},
  {id:"O",text:"JUSTIFIE"},
  {id:"N",text:"NON JUSTIFIE"}
];
//
export class ControleEvts2 extends BaseComponent<IControleEvtsProps> {
  constructor(props?: any) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  } // constructor
  public render(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2}>
              <h4 className="text-center">{this.props.controleName}</h4>
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-center">
                <Button color="primary" onClick={this.onCreate}>
                  Nouvel Evènement
                </Button>
              </div>
              {this.renderTable()}
            </td>
            <td
              hidden={!this.props.addMode && this.props.current.rev.length < 1}
            >
              {this.renderDetail()}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private renderTable(): React.ReactNode {
    if (this.props.items.length < 1) {
      return null;
    }
    return (
      <Table bordered={true} striped={true}>
        <tbody className={this.getInfoStyle()}>
          {this.renderTableHeader()}
          {this.props.items.map(p => {
            return this.renderOneLine(p);
          })}
        </tbody>
      </Table>
    );
  } // renderTable
  private renderDetail(): React.ReactNode {
    const p = this.props.current;
    const bSave =
      p.etudiantid.length > 0 &&
      p.controleid.length > 0 &&
      p.genre !== 5 &&
      p.modified;
    const bRemove = p.rev.length > 0;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr className="align-top">
            <td className={this.getInfoStyle() + " text-center"}>
              {this.renderPhoto()}
            </td>
          </tr>
          <tr>
            <td className="text-center">{this.getDetailTitle()}</td>
          </tr>
          <tr>
            <td>{this.renderForm()}</td>
          </tr>
          <tr className="align-top">
            <td className="text-center">
              <EditCommandsComponent
                canAdd={!this.props.addMode}
                hideCancel={false}
                canSave={bSave}
                canRemove={bRemove}
                busy={this.props.busy}
                onAction={this.props.onEditCommand}
              />
            </td>
          </tr>
          <tr hidden={this.props.current.rev.length < 1}>
            <td className="text-center">
              <h3 className="text-center">Pièces jointes</h3>
              <BlobInfo
                avatar={false}
                blobs={this.props.current.attachments}
                busy={this.props.busy}
                onSave={this.props.onSaveAttachment}
                onRemove={this.props.onRemoveAttachment}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private renderPhoto(): React.ReactNode {
    const p = this.props.current;
    if (p.url.length > 0) {
      return <img src={p.url} alt={p.fullname} height={196} />;
    } else {
      return null;
    }
  } // renderPhoto
  private getDetailTitle(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.props.current.displaydate}</td>
            <td className="text-center">{this.props.current.fullname}</td>
            <td className="text-center">{this.props.current.genrestring}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  //
  private renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <ItemChoiceComponent
          text={p.etudiantid}
          items={this.props.etudAffectations}
          prompt="Etudiant:"
          propname="etudiantid"
          busy={this.props.busy}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputGenreEvtComponent
          genre={p.genre}
          busy={this.props.busy}
          onGenreChanged={this.props.onFieldChanged}
        />
        <InputItemComponent
          text={p.duration}
          prompt="Durée:"
          propname="duration"
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
         <ItemChoiceComponent
          text={(p.justifie) ? "O" : "N"}
          items={tabJustifie}
          prompt="Raison:"
          propname="justifie"
          busy={this.props.busy}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={p.observations}
          prompt="Remarques:"
          propname="observations"
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  } // renderForm
  private renderLinePhoto(p: IEvtDoc): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    }
    if (this.props.busy){
      return (
          <img src={p.url} alt={p.fullname} height={48} />
      );
    } else {
      return (
        <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
          <img src={p.url} alt={p.fullname} height={48} />
        </a>
      );
    }
    
  } // renderLinePhoto
  private onCreate(e: any) {
    if (
      this.props.onEditCommand !== undefined &&
      this.props.onEditCommand !== null
    ) {
      this.props.onEditCommand("create");
    }
  } // onCreate
  private onSelectItem(id: string, e?: any) {
    if (
      this.props.onSelectItem !== undefined &&
      this.props.onSelectItem !== null
    ) {
      this.props.onSelectItem(id);
    }
  } // onSelectItem
  private onShowDetail(id: string, e?: any) {
    if (
      this.props.onShowDetail !== undefined &&
      this.props.onShowDetail !== null
    ) {
      this.props.onShowDetail(id);
    }
  } // onShowDetail
  private renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Genre</th>
        <th>Remarques</th>
      </tr>
    );
  } // render
  private renderOneLine(p: IEvtDoc): React.ReactNode {
    if (this.props.busy){
      return (
        <tr key={p.id}>
          <td>{this.renderLinePhoto(p)}</td>
          <td>
              {p.fullname}
          </td>
          <td>
              {p.genrestring}
          </td>
          <td>{p.observations}</td>
        </tr>
      );
    } else {
      return (
        <tr key={p.id}>
          <td>{this.renderLinePhoto(p)}</td>
          <td>
            <a
              href="#"
              onClick={this.onShowDetail.bind(this, p.etudiantid)}
            >
              {p.fullname}
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={this.onSelectItem.bind(this, p.id)}
            >
              {p.genrestring}
            </a>
          </td>
          <td>{p.observations}</td>
        </tr>
      );
    }
   
  } // renderOneLine
} // class  ControleEvts2
