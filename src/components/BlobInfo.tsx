import * as React from "react";
import { Table } from 'reactstrap';
import { BaseComponent } from "./BaseComponent";
import { InputFileComponent } from "./InputFileComponent";
//
export interface IIAttachedDoc {
  docid: string;
  name: string;
  mime: string;
  isAvatar: boolean;
  url: string;
} // interface IAttachedDoc
//
export interface IBlobInfoProps {
  avatar: boolean;
  blobs: IIAttachedDoc[];
  busy: boolean;
  //
  onSave?: (name: string, mime: string, data: Blob) => void;
  onRemove?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
} // interfaceIBlobInfoProps
export class BlobInfo extends BaseComponent<IBlobInfoProps> {
  constructor(props?: any) {
    super(props);
    this.onSave = this.onSave.bind(this);
  } // constructor
  public render(): React.ReactNode {
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          <tr className="align-top">
            <td className="text-center align-top">
              <InputFileComponent
                accept={""}
                busy={this.props.busy}
                onFileSelected={this.onSave}
              />
            </td>
          </tr>
          <tr hidden={this.props.blobs.length < 1}>
            <td>{this.renderTable()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  private renderTable(): React.ReactNode {
    if (this.props.avatar) {
      return (
        <Table striped={true} bordered={true}>
          <tbody className={this.getInfoStyle()}>
            <tr>
              <th>Nom</th>
              <th>Genre</th>
              <th>Avatar</th>
              <th>Action</th>
            </tr>
            {this.props.blobs.map(p => {
              return this.getOneLine(p);
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table striped={true} bordered={true}>
          <tbody className={this.getInfoStyle()}>
            <tr>
              <th>Nom</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
            {this.props.blobs.map(p => {
              return this.getOneLine(p);
            })}
          </tbody>
        </Table>
      );
    }
  } // render
  private getOneLine(p: IIAttachedDoc): React.ReactNode {
    const busy =
      this.props.busy !== undefined && this.props.busy !== null
        ? this.props.busy
        : false;
    if (this.props.avatar) {
      if (p.isAvatar) {
        return (
          <tr key={p.name}>
            <td>
              <a href={p.url} target={"_blank"}>
                {p.name}
              </a>
            </td>
            <td>{p.mime}</td>
            <td />
            <td>
              <a
                href="#"
                onClick={this.onRemove.bind(this, p.name)}
                className={this.getLinkStyle(busy)}
              >
                Supprimer
              </a>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={p.name}>
            <td>
              <a href={p.url} target={"_blank"}>
                {p.name}
              </a>
            </td>
            <td>{p.mime}</td>
            <td>
              <a
                href="#"
                onClick={this.onSetAvatar.bind(this, p.name)}
                className={this.getLinkStyle(busy)}
              >
                Avatar
              </a>
            </td>
            <td>
              <a
                href="#"
                onClick={this.onRemove.bind(this, p.name)}
                className={this.getLinkStyle(busy)}
              >
                Supprimer
              </a>
            </td>
          </tr>
        );
      }
    } else {
      return (
        <tr key={p.name}>
          <td>
            <a href={p.url} target={"_blank"}>
              {p.name}
            </a>
          </td>
          <td>{p.mime}</td>
          <td>
            <a
              href="#"
              onClick={this.onRemove.bind(this, p.name)}
              className={this.getLinkStyle(busy)}
            >
              Supprimer
            </a>
          </td>
        </tr>
      );
    } // avatar
  } // getOneLine
  private onRemove(name: string, e?: any) {
    if (
      confirm(
        "Voulez-vous vraiment supprimer " +
          name +
          "?\nAttention cette action est irrÃ©versible!"
      )
    ) {
      if (this.props.onRemove !== undefined && this.props.onRemove !== null) {
        this.props.onRemove(name);
      }
    }
  } // onRemove
  private onSetAvatar(name: string, e?: any) {
    if (
      this.props.onSetAvatar !== undefined &&
      this.props.onSetAvatar !== null
    ) {
      this.props.onSetAvatar(name);
    }
  } // onSaveAvatar
  private onSave(name: string, mime: string, data: Blob) {
    if (this.props.onSave !== undefined && this.props.onSave !== null) {
      this.props.onSave(name, mime, data);
    }
  }
} // class BlobInfo
