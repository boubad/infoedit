import * as React from "react";
import { Form } from "reactstrap";
import { InputDateComponent } from "../../../components/InputDateComponent";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from "../../../components/InputUpperTextComponent";
import { IAnneeDoc } from "../../../data/domain/DomainData";
import { SigleNamedInfoComponent } from "../../../features/Common/presentation/SigleNamedInfoComponent";

export class AnneeInfo extends SigleNamedInfoComponent<IAnneeDoc> {
  constructor(props?: any) {
    super(props);
  }
  protected renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <InputDateComponent
          text={p.startdate}
          prompt={"Date de début:"}
          propname={"startdate"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputDateComponent
          text={p.enddate}
          prompt={"Date de fin:"}
          propname={"enddate"}
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
        <InputNameTextComponent
          text={p.sigle}
          prompt={"Abbréviation:"}
          propname={"sigle"}
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
        <InputUpperTextComponent
          text={p.tag}
          prompt={"Tag:"}
          propname={"tag"}
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
    const p = this.props.current;
    return (
      p.startdate.trim().length > 0 &&
      p.enddate.trim().length > 0 &&
      p.enddate > p.startdate &&
      p.sigle.trim().length > 0 &&
      p.name.trim().length > 0 &&
      p.modified
    );
  }
  protected hasHeader(): boolean {
    return true;
  }
  protected renderHeader(): React.ReactNode {
    const p = this.props.current;
    return <span className="text-center">{p.sigle + " " + p.name}</span>;
  }
} // class AnneeInfo
