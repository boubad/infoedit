import * as React from "react";
import { Form } from "reactstrap";
import { InputCoefficientComponent } from "../../../components/InputCoefficientComponent";
import { InputDateComponent } from "../../../components/InputDateComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { IControleDoc } from "../../../data/domain/DomainData";
import { BaseInfoComponent } from "../../../features/Common/presentation/BaseInfoComponent";

export class ControleInfo extends BaseInfoComponent<IControleDoc> {
  constructor(props?: any) {
    super(props);
  }
  protected renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <InputDateComponent
          text={p.date}
          prompt={"Date:"}
          propname={"date"}
          min={this.props.startDate}
          max={this.props.endDate}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={p.name}
          prompt={"Nom:"}
          propname={"name"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputCoefficientComponent
          value={p.coefficient}
          propname={"coefficient"}
          prompt={"Coefficient:"}
          busy={this.props.busy}
          onNumberChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={p.place}
          prompt={"Emplacement:"}
          propname={"place"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={p.duration}
          prompt={"Durée:"}
          propname={"duration"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={p.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  } // renderForm
  protected canSave(): boolean {
    const start =
      this.props.startDate !== undefined && this.props.startDate !== null
        ? this.props.startDate
        : "";
    const end =
      this.props.endDate !== undefined && this.props.endDate !== null
        ? this.props.endDate
        : "";
    if (start.length < 1 || end.length < 1 || start > end) {
      return false;
    }
    const p = this.props.current;
    return (
      p.affectationid.trim().length > 0 &&
      p.semestreid.trim().length > 0 &&
      p.anneeid.trim().length > 0 &&
      p.uniteid.trim().length > 0 &&
      p.matiereid.trim().length > 0 &&
      p.date.trim().length > 0 &&
      p.date >= start &&
      p.date <= end &&
      p.name.trim().length > 0 &&
      p.modified
    );
  }
  protected hasHeader(): boolean {
    return true;
  }
  protected hasCheck(): boolean {
    return true;
  }
  protected renderHeader(): React.ReactNode {
    const p = this.props.current;
    return <h3 className="text-center">{p.name}</h3>;
  }
} // class ControleInfo
