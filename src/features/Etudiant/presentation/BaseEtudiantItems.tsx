import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "src/components/BaseComponent";
import {
  IAttachedDoc,
  IBaseDoc,
  IControleAffectationDoc,
  IEtudiantDoc
} from "src/data/domain/DomainData";

export interface IEtudiantItemsProps {
  busy: boolean;
  current: IEtudiantDoc;
}
export class BaseEtudiantItems extends BaseComponent<IEtudiantItemsProps> {
  constructor(props?: any) {
    super(props);
  }
  public render(): React.ReactNode {
    const pp = this.getItems();
    if (pp.length < 1) {
      return null;
    }
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr>
            <td>{this.renderMainTable()}</td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  protected getItems(): IControleAffectationDoc[] {
    return [];
  } // hasItems
  protected renderTableHeader(): React.ReactNode {
    return null;
  } // renderTableHeader
  protected renderOneLine(p: IControleAffectationDoc): React.ReactNode {
    return null;
  } // renderOneLine
  protected renderAttachments(p: IBaseDoc): React.ReactNode {
    return (
      <ul>
        {p.attachments.map(x => {
          return this.renderAttachment(x);
        })}
      </ul>
    );
  }
  private renderAttachment(p: IAttachedDoc): React.ReactNode {
    return (
      <li key={p.name}>
        <a href={p.url} target="_blank">
          {p.name}
        </a>
      </li>
    );
  } // renderAttachment
  private renderHeader(): React.ReactNode {
    const p = this.props.current;
    return (
      <div>
        {this.renderPhoto()}
        <h3 className="text-center">{p.fullname}</h3>
      </div>
    );
  }
  private renderPhoto(): React.ReactNode {
    const p = this.props.current;
    if (p.url.length > 0) {
      return <img src={p.url} alt={p.fullname} height={this.getImgHeight()} />;
    } else {
      return null;
    }
  } // renderPhoto
  private renderMainTable(): React.ReactNode {
    const pp = this.getItems();
    if (pp.length < 1) {
      return null;
    }
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          {this.renderTableHeader()}
          {pp.map(p => {
            return this.renderOneLine(p);
          })}
        </tbody>
      </Table>
    );
  } // render
} // class BaseEtudiantItems
