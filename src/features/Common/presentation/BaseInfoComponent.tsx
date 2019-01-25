import * as React from "react";
import { Button, Table } from 'reactstrap';
import { BaseComponent } from '../../../components/BaseComponent';
import { BlobInfo } from '../../../components/BlobInfo';
import { EditCommandsComponent } from '../../../components/EditCommandsComponent';
import { IBaseDoc, IEtudAffectationDoc, IOption } from '../../../data/DomainData';


export interface IBaseInfoComponentProps<T extends IBaseDoc> {
  addMode: boolean;
  current: T;
  itemOptions?: IOption[];
  itemId?:string;
  startDate?:string;
  endDate?:string;
  canVerify?:boolean;
  etudAffectations?:IEtudAffectationDoc[];
  busy:boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  onCheck?: () => void;
  //
  onAddModalite?: (field:string) => void;
  onRemoveModalite?: (field:string) => void;
} // interface IBaseInfoComponentProps<T>
export class BaseInfoComponent<T extends IBaseDoc> extends BaseComponent<IBaseInfoComponentProps<T>> {
  constructor(props?: any) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  } // constructor
  //
  public render(): React.ReactNode {
    let bShow = this.props.addMode;
    if (!bShow){
      bShow = this.props.current.rev.length > 0;
    }
    if (!bShow){
      return null;
    }
    const busy = (this.props.busy !== undefined && this.props.busy !== null) ? this.props.busy : false;
    return (
      <Table borderless={true} hidden={!this.hasOptionId()}>
        <tbody className={this.getInfoStyle()}>
          <tr hidden={!this.hasHeader()}>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr hidden={!this.hasCheck() || this.props.current.rev.length < 1}>
            <td className="text-center">
              <Button color='primary' onClick={this.onCheck} disabled={busy}>Vérifier les notes!</Button>
            </td>
          </tr>
          <tr hidden={!this.props.addMode && this.props.current.rev.length < 1}>
            <td className={this.getInfoStyle()}>{this.renderForm()}</td>
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
  protected hasCheck() : boolean {
    return false;
  }
  protected canCheck(): boolean {
    return (this.hasCheck() && (this.props.canVerify !== undefined) && (this.props.canVerify === true));
  }
  protected hasOptionId(): boolean {
    return true;
  }
 protected hasHeader(): boolean {
    return false;
  }
  protected renderHeader(): React.ReactNode {
    return null;
  }
  protected renderForm(): React.ReactNode {
    return null;
  }
  protected hasAvatar(): boolean {
    return false;
  }
  protected canAdd(): boolean {
    return !this.props.addMode;
  }
  protected canSave(): boolean {
    return this.props.current.modified;
  }
  protected canRemove(): boolean {
    return this.props.current.rev.length > 0;
  }
  //
  protected onCheck(e:any){
    if (this.props.onCheck !== undefined && this.props.onCheck !== null){
      this.props.onCheck();
    }
  }
} //  class BaseInfoComponent<T>
