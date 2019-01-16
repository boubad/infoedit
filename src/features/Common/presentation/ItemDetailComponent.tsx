import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { BlobInfo } from "../../../components/BlobInfo";
import { EditCommandsComponent } from "../../../components/EditCommandsComponent";
import {
  IAttachedDoc,
  IBaseDoc,
  IControleAffectationDoc,
  IOption
} from "../../../data/DomainData";
//
export interface IBaseItemDetailComponentProps<T extends IControleAffectationDoc> {
  addMode: boolean;
  current: T;
  itemOptions?: IOption[];
  busy: boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
} // interface IBaseItemDetailComponentProps<T>
//
export class ItemDetailComponent<T extends IControleAffectationDoc> extends BaseComponent<
  IBaseItemDetailComponentProps<T>
> {
  //
  constructor(props?: any) {
    super(props);
  } // constructor
  //
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr className="align-top">
            <td className="text-center">{this.renderPhoto()}</td>
          </tr>
          <tr>
            <td className="text-center">
              <h3 className="text-center">{p.current.fullname}</h3>
            </td>
          </tr>
          <tr hidden={!this.props.addMode && this.props.current.rev.length < 1}>
            <td>{this.renderForm()}</td>
          </tr>
          <tr className="align-top">
            <td className="text-center">
              <EditCommandsComponent
                canAdd={this.canAdd()}
                hideCancel={this.hideCancel()}
                canSave={this.canSave()}
                canRemove={this.canRemove()}
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
  //
  protected hasPhoto(): boolean {
    return true;
  }
  protected getTitle(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.props.current.displaydate}</td>
            <td className="text-center">{this.props.current.controlename}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  protected renderPhoto(): React.ReactNode {
    const p = this.props.current;
    if (p.url.length > 0) {
      return <img src={p.url} alt={p.fullname} height={196} />;
    } else {
      return <div />;
    }
  } // renderPhoto

  protected renderForm(): React.ReactNode {
    return null;
  }
  protected canAdd(): boolean {
    return !this.props.addMode;
  }
  protected hideCancel(): boolean {
    return false;
  }
  protected canSave(): boolean {
    const p = this.props.current;
    return p.etudiantid.length > 0 && p.controleid.length > 0 && p.modified;
  }
  protected canRemove(): boolean {
    return this.props.current.rev.length > 0;
  }
  protected renderAttachment(p: IAttachedDoc): React.ReactNode {
    return (
      <li key={p.name}>
        <a href={p.url} target="_blank">
          {p.name}
        </a>
      </li>
    );
  } // renderAttachment
  protected renderAttachments(p: IBaseDoc): React.ReactNode {
    return (
      <ul hidden={p.attachments.length < 1}>
        {p.attachments.map(x => {
          return this.renderAttachment(x);
        })}
      </ul>
    );
  } // renderAttachments
} // class ItemDetailComponent<T>
