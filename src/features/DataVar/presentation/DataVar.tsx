import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IDataVarDoc } from "../../../data/domain/DomainData";
import { DataVarInfo } from "./DataVarInfo";
import { DataVarList } from "./DataVarList";
//
export interface IDataVarProps {
  addMode: boolean;
  current: IDataVarDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IDataVarDoc[];
  busy: boolean;
  //
  refresh?: () => void;
  gotoPage?: (page: number) => void;
  selectItem?: (docid: string) => void;
  createItem?: () => void;
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  //
  onAddModalite?: (field:string) => void;
  onRemoveModalite?: (field:string) => void;
} // interfaceIAnneesProps
//
export class DataVar extends BaseComponent<IDataVarProps> {
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
              <h2 className="text-center">Variables</h2>
            </td>
          </tr>
          <tr>
            <td className="top">
              <DataVarList
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
            <td className="top">
              <DataVarInfo
                addMode={p.addMode}
                current={p.current}
                busy={this.props.busy}
                onFieldChanged={p.onFieldChanged}
                onEditCommand={p.onEditCommand}
                onSaveAttachment={p.onSaveAttachment}
                onRemoveAttachment={p.onRemoveAttachment}
                onAddModalite={p.onAddModalite}
                onRemoveModalite={p.onRemoveModalite}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
} // class DataVar
