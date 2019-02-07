import * as React from "react";
import { Form } from "reactstrap";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputLowerTextComponent } from "../../../components/InputLowerTextComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from "../../../components/InputUpperTextComponent";
import { ISemestreDoc } from "../../../data/DomainData";
import { SigleNamedInfoComponent } from "../../../features/Common/presentation/SigleNamedInfoComponent";

export class SemestreInfo extends SigleNamedInfoComponent<ISemestreDoc> {
  constructor(props?: any) {
    super(props);
  }
  protected renderForm(): React.ReactNode {
    return (
      <Form className={this.getInfoStyle()}>
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
} // class SigleNamedInfoComponent
