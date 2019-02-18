import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { IAffectationDoc, IOption } from '../../../data/domain/DomainData';
import { AffectationInfo } from "./AffectationInfo";
import { AffectationList } from "./AffectationList";
//
export interface IAffectationsProps {
  addMode: boolean;
  current: IAffectationDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IAffectationDoc[];
  groupesOptions: IOption[];
  startDate: string;
  endDate: string;
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
} // interfaceIAffectationsProps
//
export class Affectation extends BaseComponent<IAffectationsProps> {
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
              <h2 className="text-center">Affectations</h2>
            </td>
          </tr>
          <tr>
            <td className="top">
              <AffectationList
                addMode={p.addMode}
                currentPage={p.currentPage}
                displayPages={p.displayPages}
                pagesCount={p.pagesCount}
                items={p.items}
                busy={p.busy}
                refresh={p.refresh}
                gotoPage={p.gotoPage}
                selectItem={p.selectItem}
                createItem={p.createItem}
              />
            </td>
            <td className="top">
              <AffectationInfo
                addMode={p.addMode}
                current={p.current}
                groupesOptions={p.groupesOptions}
                startDate={p.startDate}
                endDate={p.endDate}
                busy={p.busy}
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
} // class Affectations
