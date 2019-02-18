import * as React from "react";
import { Form } from "reactstrap";
import { ItemChoiceComponent } from "../../../components/InputChoiceComponent";
import { InputCoefficientComponent } from "../../../components/InputCoefficientComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputLowerTextComponent } from "../../../components/InputLowerTextComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from '../../../components/InputUpperTextComponent';
import { IMatiereDoc, IOption } from "../../../data/domain/DomainData";
import { SigleNamedInfoComponent } from "../../../features/Common/presentation/SigleNamedInfoComponent";

export class MatiereInfo extends SigleNamedInfoComponent<IMatiereDoc> {
  constructor(props?: any) {
    super(props);
  }
  protected renderForm(): React.ReactNode {
    const items: IOption[] =
      this.props.itemOptions !== undefined && this.props.itemOptions !== null
        ? this.props.itemOptions
        : [];
    if (items.length < 2) {
      return null;
    }
    if (this.props.itemId === undefined || this.props.itemId === null) {
      return null;
    }
    if (this.props.itemId.trim().length < 1) {
      return null;
    }
    return (
      <Form className={this.getInfoStyle()}>
        <ItemChoiceComponent
          text={this.props.current.uniteid}
          items={items}
          prompt={"Unite:"}
          propname={"uniteid"}
          busy={this.props.busy}
          onItemChoosen={this.props.onFieldChanged}
        />
        <InputLowerTextComponent
          text={this.props.current.sigle}
          prompt={"Abbréviation:"}
          propname={"sigle"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={this.props.current.name}
          prompt={"Nom complet:"}
          propname={"name"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={this.props.current.modname}
          prompt={"Module:"}
          propname={"modname"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputCoefficientComponent
          value={this.props.current.coefficient}
          propname={"coefficient"}
          prompt={"Coefficient:"}
          busy={this.props.busy}
          onNumberChanged={this.props.onFieldChanged}
        />
        <InputCoefficientComponent
          value={this.props.current.ecs}
          propname={"ecs"}
          prompt={"ECS:"}
          busy={this.props.busy}
          onNumberChanged={this.props.onFieldChanged}
        />
         <InputUpperTextComponent
          text={this.props.current.tag}
          prompt={"Tag:"}
          propname={"tag"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={this.props.current.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  } // renderForm
  protected hasOptionId(): boolean {
    const p = this.props.itemId;
    return p !== undefined && p !== null && p.trim().length > 0;
  }
  protected canSave(): boolean {
    const p = this.props.current;
    return (
      p.uniteid.trim().length > 0 &&
      p.sigle.trim().length > 0 &&
      p.name.trim().length > 0 &&
      p.modified
    );
  }
} // class MatiereInfo
