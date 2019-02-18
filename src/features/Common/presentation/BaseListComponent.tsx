import * as React from "react";
import { Button, Table } from 'reactstrap';
import { BaseComponent } from "../../../components/BaseComponent";
import { PageNavigatorComponent } from "../../../components/PageNavigatorComponent";
import { IBaseDoc } from '../../../data/domain/DomainData';

export interface IBaseListComponentProps<T extends IBaseDoc> {
  addMode: boolean;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: T[];
  busy: boolean;
  //
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
  createItem?: () => void;
  showDetail?: (id:string) => void;
} // interface IBaseListComponentProps<T extends IBaseDoc>
//
export class BaseListComponent<T extends IBaseDoc> extends BaseComponent<
  IBaseListComponentProps<T>
> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public componentWillMount() {
    if (this.props.refresh !== undefined && this.props.refresh !== null) {
      this.props.refresh();
    }
  }

  public render(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td
              hidden={this.props.items.length < 1}
            >
              {this.renderMain()}
            </td>
          </tr>
          <tr hidden={this.props.addMode}>
            <td className="text-center">
              <Button color="primary" onClick={this.props.createItem}>
                Nouveau
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  protected renderMain(): React.ReactNode {
    const p = this.props;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="center">
              <PageNavigatorComponent
                currentPage={p.currentPage}
                displayPages={p.displayPages}
                pagesCount={p.pagesCount}
                busy={this.props.busy}
                gotoPage={p.gotoPage}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Table bordered={true} striped={true}>
                <tbody className={this.getInfoStyle()}>
                  {this.renderTableHeader()}
                  {p.items.map(x => {
                    return this.renderOneLine(x);
                  })}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  protected renderTableHeader(): React.ReactNode {
    return null;
  } // renderTableHeader
  protected renderOneLine(px: T): React.ReactNode {
    return null;
  } // renderOneLine
  protected onSelectItem(docid: string, e?: any) {
    if (this.props.selectItem !== undefined && this.props.selectItem !== null) {
      this.props.selectItem(docid);
    }
  } // onSelectItem
  protected onShowDetail(id: string, e?: any){
    if (this.props.showDetail){
      this.props.showDetail(id);
    }
  }// onShowDetail
} // class BaseListComponent<T extends IBaseDoc>
