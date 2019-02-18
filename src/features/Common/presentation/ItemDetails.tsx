import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IControleAffectationDoc, IOption } from "../../../data/domain/DomainData";
//
export interface IItemDetailProps<T extends IControleAffectationDoc> {
  addMode: boolean;
  items: T[];
  current: T;
  controleName: string;
  itemOptions?: IOption[];
  busy: boolean;
  //
  onSelectItem?: (id: string) => void;
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onShowDetail?: (id:string) => void;
} // interface IItemDetailProps<T extends IItemDoc>
//
export class ItemDetail<T extends IControleAffectationDoc> extends BaseComponent<
  IItemDetailProps<T>
> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const bShow = !this.props.addMode || this.props.current.rev.length > 0;
    return (
      <Table>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center" colSpan={2}>
              <h4 className="text-center">{this.props.controleName}</h4>
            </td>
          </tr>
          <tr>
            <td hidden={this.props.items.length < 1} className="top">
              <Table bordered={true} striped={true}>
                <tbody className={this.getInfoStyle()}>
                  {this.renderTableHeader()}
                  {this.props.items.map(p => {
                    return this.renderOneLine(p);
                  })}
                </tbody>
              </Table>
            </td>
            <td hidden={!bShow} className="top">{this.renderDetail()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  protected renderTableHeader(): React.ReactNode {
    return null;
  } // renderTableHeader
  protected renderOneLine(p: T): React.ReactNode {
    return null;
  }
  protected renderDetail(): React.ReactNode {
    return null;
  } // renderDetail
  protected renderLinePhoto(p: T): React.ReactNode {
    if (p.url.length < 1) {
      return null;
    }
    if (this.props.busy) {
      return (
        <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
      );
    } else {
      return (
        <a href="#" onClick={this.onShowDetail.bind(this, p.etudiantid)}>
          <img src={p.url} alt={p.fullname} height={this.getThumbHeight()} />
        </a>
      );
    }
  } // renderLinePhoto
  protected onSelectItem(id: string) {
    if (
      this.props.onSelectItem !== undefined &&
      this.props.onSelectItem !== null
    ) {
      this.props.onSelectItem(id);
    }
  } // onSelectItem
  protected onShowDetail(id: string) {
    if (
      this.props.onShowDetail !== undefined &&
      this.props.onShowDetail !== null
    ) {
      this.props.onShowDetail(id);
    }
  } // onShowDetail
} // class ItemDetail<T extends IItemDoc>
