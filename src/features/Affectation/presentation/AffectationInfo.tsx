import * as React from "react";
import { Form, Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { BlobInfo } from "../../../components/BlobInfo";
import { EditCommandsComponent } from "../../../components/EditCommandsComponent";
import { ItemChoiceComponent } from "../../../components/InputChoiceComponent";
import { InputDateComponent } from "../../../components/InputDateComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { IAffectationDoc, IOption } from "../../../data/DomainData";

export interface IAffectationInfoProps {
  addMode: boolean;
  current: IAffectationDoc;
  groupesOptions: IOption[];
  startDate: string;
  endDate: string;
  busy: boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
} // interface IAffectationInfoProps
export class AffectationInfo extends BaseComponent<IAffectationInfoProps> {
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
      pc.anneeid.length > 0 &&
      pc.semestreid.length > 0 &&
      pc.groupeid.length > 0 &&
      pc.startdate.length > 0 &&
      pc.enddate.length > 0 &&
      pc.enddate > pc.startdate &&
      pc.startdate >= p.startDate &&
      pc.enddate <= p.endDate && pc.modified
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
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <ItemChoiceComponent
          text={p.groupeid}
          items={this.props.groupesOptions}
          prompt={"Groupe:"}
          propname={"groupeid"}
          busy={this.props.busy}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputDateComponent
          text={p.startdate}
          prompt={"Date de début:"}
          propname={"startdate"}
          min={this.props.startDate}
          max={this.props.endDate}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDateComponent
          text={p.enddate}
          prompt={"Date de fin:"}
          propname={"enddate"}
          min={this.props.startDate}
          max={this.props.endDate}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={p.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  }
} //  class AffectationInfo
