import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { ISemestreDoc } from "../../../data/domain/DomainData";
import { SemestreInfo } from "./SemestreInfo";
import { SemestreList } from "./SemestreList";
//
export interface ISemestresProps {
  addMode: boolean;
  current: ISemestreDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: ISemestreDoc[];
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
} // interfaceIAnneesProps
//
export class Semestre extends BaseComponent<ISemestresProps, {}> {
  constructor(props?: any) {
    super(props);
  } // constructor
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td colSpan={2} className="center">
              <h2 className="center">Semestres</h2>
            </td>
          </tr>
          <tr>
            <td>
              <SemestreList
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
              <SemestreInfo
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
} // class Semestres
