import * as React from "react";
import { Form, Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { BlobInfo } from "../../../components/BlobInfo";
import { EditCommandsComponent } from "../../../components/EditCommandsComponent";
import { ItemChoiceComponent } from "../../../components/InputChoiceComponent";
import { InputDateComponent } from "../../../components/InputDateComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { IEtudAffectationDoc, IOption } from "../../../data/domain/DomainData";

export interface IEtudAffectationInfoProps {
  addMode: boolean;
  current: IEtudAffectationDoc;
  etudiantsOptions: IOption[];
  currentOptions: IOption[];
  startDate: string;
  endDate: string;
  busy: boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
} // interface IAffectationInfoProps
export class EtudAffectationInfo extends BaseComponent<
  IEtudAffectationInfoProps
> {
  constructor(props?: any) {
    super(props);
  } // constructor
  //
  public render(): React.ReactNode {
    const p = this.props;
    const pc = p.current;
    if (!p.addMode && pc.rev.length < 1) {
      return null;
    }
    const canSave =
      pc.affectationid.length > 0 &&
      pc.etudiantid.length > 0 &&
      pc.enddate > pc.startdate &&
      pc.startdate >= p.startDate &&
      pc.enddate <= p.endDate &&
      pc.modified;
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr>
            <td className={this.getInfoStyle()}>{this.renderForm()}</td>
          </tr>
          <tr>
            <td className="text-center">
              <EditCommandsComponent
                canAdd={!p.addMode}
                hideCancel={false}
                canSave={canSave}
                canRemove={pc.rev.length > 0}
                busy={this.props.busy}
                onAction={p.onEditCommand}
              />
            </td>
          </tr>
          <tr hidden={pc.rev.length < 1}>
            <td className="text-center">
              <h3 className="text-center">Pièces jointes</h3>
              <BlobInfo
                avatar={false}
                blobs={pc.attachments}
                busy={this.props.busy}
                onSave={p.onSaveAttachment}
                onRemove={p.onRemoveAttachment}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  private renderHeader(): React.ReactNode {
    const p = this.props.current;
    return (
      <span className="text-center">
        {p.anneename + " " + p.semestrename + " " + p.groupename}
      </span>
    );
  }
  private renderForm(): React.ReactNode {
    const opts = (this.props.current.rev.length > 0) ? this.props.currentOptions : this.props.etudiantsOptions;
    return (
      <Form className={this.getInfoStyle()}>
        <ItemChoiceComponent
          text={this.props.current.etudiantid}
          items={opts}
          prompt={"Etudiant:"}
          propname={"etudiantid"}
          busy={this.props.busy || this.props.current.rev.length > 0}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputDateComponent
          text={this.props.current.startdate}
          prompt={"Date de début:"}
          propname={"startdate"}
          min={this.props.startDate}
          max={this.props.endDate}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDateComponent
          text={this.props.current.enddate}
          prompt={"Date de fin:"}
          propname={"enddate"}
          min={this.props.startDate}
          max={this.props.endDate}
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
  }
} //  class AffectationInfo
