import * as React from "react";
import { Form, Table } from 'reactstrap';
import { BaseComponent } from '../../../components/BaseComponent';
import { BlobInfo } from '../../../components/BlobInfo';
import { InputDescComponent } from '../../../components/InputDescComponent';
import { InputEmailComponent } from '../../../components/InputEmailComponent';
import { InputNameTextComponent } from '../../../components/InputNameTextComponent';
import { InputUpperTextComponent } from '../../../components/InputUpperTextComponent';
import { StatusChoiceComponent } from '../../../components/StatusChoiceComponent';
import { IEtudiantDoc } from '../../../data/domain/DomainData';


export interface IFicheEtudiantInfoProps {
  current: IEtudiantDoc;
  busy:boolean;
  //
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
} // interface IFicheEtudiantInfoProps
export class FicheEtudiantInfo extends BaseComponent<IFicheEtudiantInfoProps> {
  constructor(props?: any) {
    super(props);
  } // constructor
  //
  public render(): React.ReactNode {
    return (
      <Table borderless={true}>
        <tbody className={this.getInfoStyle()}>
          <tr>
            <td>{this.renderForm()}</td>
          </tr>
          <tr>
            <td className="center">
              <h3 className="center">Pièces jointes</h3>
              <BlobInfo
                avatar={true}
                blobs={this.props.current.attachments}
                busy={this.props.busy}
                onSave={this.props.onSaveAttachment}
                onRemove={this.props.onRemoveAttachment}
                onSetAvatar={this.props.onSetAvatar}
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
        <InputUpperTextComponent
          text={p.lastname}
          prompt={"Nom de famille:"}
          propname={"lastname"}
          busy={true}
        />
        <InputNameTextComponent
          text={p.firstname}
          prompt={"Prénom(s):"}
          propname={"firstname"}
          busy={true}
        />
        <InputEmailComponent
          text={p.email}
          prompt={"Adresse courriel:"}
          propname={"email"}
          busy={true}
        />
        <InputDescComponent
          text={p.observations}
          prompt={"Remarques:"}
          propname={"observations"}
          busy={true}
        />
        <StatusChoiceComponent 
          text = {p.status}
          prompt = {"Etat:"}
          propname = {"status"}
          busy={true}
        />
      </Form>
    );
  } // renderForm
} //  class BaseInfoComponent<T>
