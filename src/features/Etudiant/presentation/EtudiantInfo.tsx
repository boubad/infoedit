import * as React from "react";
import { Form, Table } from "reactstrap";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputEmailComponent } from "../../../components/InputEmailComponent";
import { InputNameTextComponent } from "../../../components/InputNameTextComponent";
import { InputUpperTextComponent } from "../../../components/InputUpperTextComponent";
import { StatusChoiceComponent } from "../../../components/StatusChoiceComponent";
import { IEtudiantDoc } from "../../../data/domain/DomainData";
import { BaseInfoComponent } from "../../../features/Common/presentation/BaseInfoComponent";

export class EtudiantInfo extends BaseInfoComponent<IEtudiantDoc> {
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
          <InputUpperTextComponent
            text={p.redoublant}
            prompt={"Redoublant:"}
            propname={"redoublant"}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
          <InputUpperTextComponent
            text={p.sup}
            prompt={"Etudes supérieures:"}
            propname={"sup"}
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
          <InputUpperTextComponent
            text={p.ident}
            prompt={"Numéro étudiant:"}
            propname={"ident"}
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
        {this.renderDataTable()}
      </div>
    );
  } // renderForm

  protected hasCheck(): boolean {
    return this.props.current.affectations.length > 0;
  }
  protected hasAvatar(): boolean {
    return true;
  }
  protected canSave(): boolean {
    const p = this.props.current;
    return (
      p.lastname.trim().length > 0 &&
      p.firstname.trim().length > 0 &&
      p.status.trim().length > 0 &&
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
  private renderDataTable(): React.ReactNode {
    const vv: any[] = [];
    const v = this.props.current.data;
    // tslint:disable-next-line:forin
    for (const name in v) {
      const val = v[name];
      vv.push({ name, val });
    } // name
    if (vv.length < 1){
      return null;
    }
    return (
      <Table bordered={true}>
        <tbody className={this.getInfoStyle()}>
          {vv.map(x => {
            return this.renderDataLine(x.name, x.val);
          })}
        </tbody>
      </Table>
    );
  } // renderDataTable
  private renderDataLine(name: string, val: any): React.ReactNode {
    const sval = val ? "" + val : "";
    return (
      <tr key={name}>
        <td>
          <InputUpperTextComponent
            text={sval}
            prompt={name + ":"}
            propname={name}
            busy={this.props.busy}
            onTextChanged={this.props.onFieldChanged}
          />
        </td>
      </tr>
    );
  } // renderDataLine
  //
} // class EtudiantInfo
