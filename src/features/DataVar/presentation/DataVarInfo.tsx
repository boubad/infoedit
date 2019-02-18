import * as React from "react";
import { Form, Table } from "reactstrap";
import { BlobInfo } from "../../../components/BlobInfo";
import { EditCommandsComponent } from "../../../components/EditCommandsComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputLowerTextComponent } from "../../../components/InputLowerTextComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from "../../../components/InputUpperTextComponent";
import { VariableTypeChoiceComponent } from "../../../components/VariableTypeChoiceComponent";
import { DATAVAR_TYPE_STRING } from '../../../data/domain/DataProcs';
import { IDataVarDoc } from '../../../data/domain/DomainData';
import { BaseInfoComponent } from "../../../features/Common/presentation/BaseInfoComponent";
export class DataVarInfo extends BaseInfoComponent<IDataVarDoc> {
  constructor(props?: any) {
    super(props);
    this.onAddModalite = this.onAddModalite.bind(this);
  }
  public render(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr hidden={!this.hasHeader()}>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr hidden={!this.props.addMode && this.props.current.rev.length < 1}>
            <td className={this.getInfoStyle()}>{this.renderForm()}</td>
          </tr>
          <tr hidden={this.props.current.vartype !== DATAVAR_TYPE_STRING}>
            <td>{this.renderModalites()}</td>
          </tr>
          <tr>
            <td className="text-center">
              <EditCommandsComponent
                canAdd={this.canAdd()}
                canSave={this.canSave()}
                canRemove={this.canRemove()}
                busy={this.props.busy}
                onAction={this.props.onEditCommand}
              />
            </td>
          </tr>
          <tr hidden={!this.canRemove()}>
            <td className="text-center">
              <h3 className="text-center">Pièces jointes</h3>
              <BlobInfo
                avatar={this.hasAvatar()}
                blobs={this.props.current.attachments}
                busy={this.props.busy}
                onSave={this.props.onSaveAttachment}
                onRemove={this.props.onRemoveAttachment}
                onSetAvatar={this.props.onSetAvatar}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  protected renderForm(): React.ReactNode {
    return (
      <Form className={this.getInfoStyle()}>
        <InputLowerTextComponent
          text={this.props.current.sigle}
          prompt={"Abbréviation:"}
          propname={"sigle"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={this.props.current.name}
          prompt={"Nom complet:"}
          propname={"name"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <VariableTypeChoiceComponent
          text={this.props.current.vartype}
          busy={this.props.busy}
          prompt={"Type variable:"}
          propname={"vartype"}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputUpperTextComponent
          text={this.props.current.tag}
          prompt={"Tag:"}
          propname={"tag"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={this.props.current.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  } // renderForm

  protected canSave(): boolean {
    const p = this.props.current;
    return (
      p.sigle.trim().length > 0 &&
      p.name.trim().length > 0 &&
      p.vartype.trim().length > 0 &&
      p.modified
    );
  }
  protected hasHeader(): boolean {
    return true;
  }
  protected renderHeader(): React.ReactNode {
    const p = this.props.current;
    return <span className="text-center">{p.sigle + " " + p.name}</span>;
  }
  private onAddModalite(val: any, propname: string) {
    if (this.props.onAddModalite) {
      const s = "" + val;
      const ss = s.trim();
      if (ss.length > 0) {
        this.props.onAddModalite(ss);
      }
    }
  } // onAddModalite
  private onRemoveModalite(field: string, e?: any) {
    if (this.props.onRemoveModalite && field.trim().length > 0) {
      this.props.onRemoveModalite(field.trim());
    }
  } // onRemoveModalite
  private renderModalites(): React.ReactNode {
    return (
      <div className={this.getInfoStyle()}>
        {this.renderModaliteInput()}
        {this.renderModalitesTable()}
      </div>
    );
  } // renderModalites
  private renderModaliteInput(): React.ReactNode {
    return (
      <Form inline={true} className={this.getInfoStyle()}>
        <InputUpperTextComponent
          text={""}
          prompt={"Nouvelle modalité:"}
          propname={"modalité"}
          busy={this.props.busy}
          onTextChanged={this.onAddModalite}
        />
      </Form>
    );
  } //  renderMadaliteInput
  private renderModalitesTable(): React.ReactNode {
    const pp = this.props.current.modalvalues;
    if (pp.length < 1) {
      return null;
    }
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <th>Modalité</th>
            <th>Action</th>
          </tr>
          {pp.map(field => {
            return this.renderModaliteLine(field);
          })}
        </tbody>
      </Table>
    );
  } // renderModalitesTable
  private renderModaliteLine(field: string): React.ReactNode {
    if (this.props.busy) {
      return (
        <tr key={field}>
          <td>{field}</td>
          <td>{"Supprimer"}</td>
        </tr>
      );
    } else {
      return (
        <tr key={field}>
          <td>{field}</td>
          <td>
            <a href="#" onClick={this.onRemoveModalite.bind(this, field)}>
              {"Supprimer"}
            </a>
          </td>
        </tr>
      );
    }
  } // renderModaliteLine
} // class UniteInfo
