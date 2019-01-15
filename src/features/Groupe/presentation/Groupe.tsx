import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { IGroupeDoc } from '../../../data/DomainData';
import { GroupeInfo } from './GroupeInfo';
import { GroupeList } from './GroupeList';
//
export interface IGroupesProps {
  addMode: boolean;
  current: IGroupeDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IGroupeDoc[];
  busy:boolean;
  //
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
  createItem?: () => void;
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
} // interfaceIAnneesProps
//
export class Groupe extends BaseComponent<IGroupesProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2} className="text-center">
              <h2 className="text-center">Groupes</h2>
            </td>
          </tr>
          <tr>
            <td>
              <GroupeList
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
            <td>
              <GroupeInfo
                addMode={p.addMode}
                current={p.current}
                busy={this.props.busy}
                onFieldChanged={p.onFieldChanged}
                onEditCommand={p.onEditCommand}
                onSaveAttachment={p.onSaveAttachment}
                onRemoveAttachment={p.onRemoveAttachment}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
} // class Groupes
