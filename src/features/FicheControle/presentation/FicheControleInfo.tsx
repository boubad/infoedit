import * as React from "react";
import { Form, Table } from "reactstrap";
import { InputCoefficientComponent } from "src/components/InputCoefficientComponent";
import { InputDateComponent } from "src/components/InputDateComponent";
import { InputDescComponent } from "src/components/InputDescComponent";
import { InputNameTextComponent } from "src/components/InputNameTextComponent";
import { BaseComponent } from "../../../components/BaseComponent";
import { BlobInfo } from "../../../components/BlobInfo";
import { IControleDoc } from "../../../data/DomainData";

export interface IFicheControleInfoProps {
  current: IControleDoc;
} // interface IBaseInfoComponentProps<T>
export class FicheControleInfo extends BaseComponent<IFicheControleInfoProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  //
  public render(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td className="text-center">{this.renderHeader()}</td>
          </tr>
          <tr>
            <td>{this.renderForm()}</td>
          </tr>
          <tr>
            <td className="text-center">
              <h3 className="text-center">Pièces jointes</h3>
              <BlobInfo
                avatar={false}
                blobs={this.props.current.attachments}
                busy={true}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } // render
  //
  private renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <InputDateComponent
          text={p.date}
          prompt={"Date:"}
          propname={"date"}
          busy={true}
        />
        <InputNameTextComponent
          text={p.name}
          prompt={"Nom:"}
          propname={"name"}
          busy={true}
        />
        <InputCoefficientComponent
          value={p.coefficient}
          propname={"coefficient"}
          prompt={"Coefficient:"}
          busy={true}
        />
        <InputNameTextComponent
          text={p.place}
          prompt={"Emplacement:"}
          propname={"place"}
          busy={true}
        />
        <InputNameTextComponent
          text={p.duration}
          prompt={"Durée:"}
          propname={"duration"}
          busy={true}
        />
        <InputDescComponent
          text={p.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={true}
        />
      </Form>
    );
  } // renderForm
  private renderHeader(): React.ReactNode {
    const p = this.props.current;
    return <h3 className="text-center">{p.name}</h3>;
  }
} //  class BaseInfoComponent<T>
