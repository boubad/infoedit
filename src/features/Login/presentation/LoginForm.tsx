import * as React from "react";
import { Button, Form } from "reactstrap";
import { BaseComponent } from "src/components/BaseComponent";
import { InputEmailComponent } from "../../../components/InputEmailComponent";
import { InputItemComponent } from "../../../components/InputItemComponent";

export interface ILoginFormProps {
  busy: boolean;
  onLogin?: (password: string, username: string, email: string) => void;
} // interface ILoginFormProps
interface ILoginFormState {
  email: string;
  password: string;
  username: string;
} // interface ILoginFormState
//
export class LoginForm extends BaseComponent<ILoginFormProps, ILoginFormState> {
  //
  constructor(props?: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onLogin = this.onLogin.bind(this);
  } // constructor
  public render(): React.ReactNode {
    const p = this.state;
    const bOk =
      p.password.length > 0 && (p.username.length > 0 || p.email.length > 0);
    return (
      <div className={this.getInfoStyle()}>
        <Form>
          <InputItemComponent
            text={p.username}
            prompt={"Identifiant utilisateur:"}
            propname={"username"}
            busy={this.props.busy}
            onTextChanged={this.onTextChanged}
          />
          <InputEmailComponent
            text={p.email}
            prompt={"Adresse courriel:"}
            propname={"email"}
            busy={this.props.busy}
            onTextChanged={this.onTextChanged}
          />
          <InputItemComponent
            text={p.password}
            prompt={"Mot de passe:"}
            propname={"password"}
            busy={this.props.busy}
            onTextChanged={this.onTextChanged}
          />
        </Form>
        <div hidden={!bOk}>
        <Button color='primary' onClick={this.onLogin} disabled={this.props.busy}>Connexion!</Button>
        </div>
      </div>
    );
  } // render
  private onLogin(e: any) {
    if (this.props.onLogin) {
      this.props.onLogin(
        this.state.password,
        this.state.username,
        this.state.email
      );
    }
  } // onLogin
  private onTextChanged(val: any, propname: string) {
    if (propname === "username") {
      this.setState({ username: val });
    } else if (propname === "password") {
      this.setState({ password: val });
    } else if (propname === "email") {
      this.setState({ email: val });
    }
  }
} // class LoginForm
