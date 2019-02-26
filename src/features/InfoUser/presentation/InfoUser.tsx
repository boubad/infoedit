import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { IInfoUserDoc } from '../../../data/domain/DomainData';
import { InfoUserInfo } from './InfoUserInfo';
import { InfoUserList } from './InfoUserList';
//
export interface IInfoUsersProps {
  addMode: boolean;
  current: IInfoUserDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IInfoUserDoc[];
  busy:boolean;
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  //
  createItem?: () => void;
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
}
//
export class InfoUser extends BaseComponent<IInfoUsersProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    let hasDetail = p.addMode;
    if (!hasDetail) {
      hasDetail = p.current.rev.length > 0;
    }
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2} className="text-center">
              <h2 className="text-center">InfoUsers</h2>
            </td>
          </tr>
          <tr>
            <td>
              <InfoUserList
                addMode={p.addMode}
                currentPage={p.currentPage}
                displayPages={p.displayPages}
                pagesCount={p.pagesCount}
                items={p.items}
                busy={this.props.busy}
                refresh={p.refresh}
                gotoPage={p.gotoPage}
                selectItem={p.selectItem}
                createItem={p.createItem}
              />
            </td>
            <td hidden={!hasDetail}>
              <InfoUserInfo
                addMode={p.addMode}
                current={p.current}
                busy={this.props.busy}
                onFieldChanged={p.onFieldChanged}
                onEditCommand={p.onEditCommand}
                onSaveAttachment={p.onSaveAttachment}
                onRemoveAttachment={p.onRemoveAttachment}
                onSetAvatar={p.onSetAvatar}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
 
} // class InfoUsers
