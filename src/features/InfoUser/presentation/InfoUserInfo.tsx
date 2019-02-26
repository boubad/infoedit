import * as React from "react";
import { Form} from "reactstrap";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputEmailComponent } from "../../../components/InputEmailComponent";
import { InputItemComponent } from '../../../components/InputItemComponent';
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from "../../../components/InputUpperTextComponent";
import { StatusChoiceComponent } from "../../../components/StatusChoiceComponent";
import { IInfoUserDoc } from "../../../data/domain/DomainData";
import { BaseInfoComponent } from "../../../features/Common/presentation/BaseInfoComponent";

export class InfoUserInfo extends BaseInfoComponent<IInfoUserDoc> {
  constructor(props?: any) {
    super(props);
  }
  protected renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <div>
        <Form className={this.getInfoStyle()}>
        <InputUpperTextComponent
            text={p.sexe}
            prompt={"Sexe:"}
            propname={"sexe"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
          <InputUpperTextComponent
            text={p.lastname}
            prompt={"Nom de famille:"}
            propname={"lastname"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
          <InputNameTextComponent
            text={p.firstname}
            prompt={"Prénom(s):"}
            propname={"firstname"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
          <InputItemComponent
            text={p.username}
            prompt={"Identifiant utilisateur:"}
            propname={"username"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
           <InputItemComponent
            text={p.password}
            prompt={"Mot de passe:"}
            propname={"password"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
          <InputEmailComponent
            text={p.email}
            prompt={"Adresse courriel:"}
            propname={"email"}
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
          <StatusChoiceComponent
            text={p.status}
            prompt={"Etat:"}
            propname={"status"}
            busy={this.props.busy}
            onItemChoosen={this.props.onFieldChanged}
          />
        </Form>
      </div>
    );
  } // renderForm

  protected hasAvatar(): boolean {
    return true;
  }
  protected canSave(): boolean {
    const p = this.props.current;
    return (
      p.lastname.trim().length > 0 &&
      p.firstname.trim().length > 0 &&
      p.username.trim().length > 0 &&
      p.email.trim().length > 0 &&
      p.password.trim().length > 0 &&
      p.modified
    );
  }
  protected hasHeader(): boolean {
    return true;
  }
  protected renderHeader(): React.ReactNode {
    const p = this.props.current;
    return (
      <div>
        {this.renderPhoto()}
        <h3 className="text-center">{p.fullname}</h3>
      </div>
    );
  }
  protected renderPhoto(): React.ReactNode {
    const p = this.props.current;
    if (p.url.length > 0) {
      return <img src={p.url} alt={p.fullname} height={196} />;
    } else {
      return null;
    }
  } // renderPhoto
  //
  //
} // class InfoUserInfo
