import * as React from "react";
import { Table } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import { IEtudAffectationDoc, IOption } from "../../../data/DomainData";
import { EtudAffectationInfo } from "./EtudAffectationInfo";
import { EtudAffectationList } from "./EtudAffectationList";
//
export interface IEtudAffectationsProps {
  addMode: boolean;
  current: IEtudAffectationDoc;
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  items: IEtudAffectationDoc[];
  etudiantsOptions: IOption[];
  currentOptions: IOption[];
  startDate: string;
  endDate: string;
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
  showDetail?: (id:string) => void;
} // interfaceIAffectationsProps
//
export class EtudAffectation extends BaseComponent<IEtudAffectationsProps> {
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
              <h2 className="text-center">Affectations-Etudiants</h2>
            </td>
          </tr>
          <tr>
            <td className="top">
              <EtudAffectationList
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
                showDetail={p.showDetail}
              />
            </td>
            <td className="top">
              <EtudAffectationInfo
                addMode={p.addMode}
                current={p.current}
                etudiantsOptions={p.etudiantsOptions}
                currentOptions={p.currentOptions}
                startDate={p.startDate}
                endDate={p.endDate}
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
} // class Affectations
