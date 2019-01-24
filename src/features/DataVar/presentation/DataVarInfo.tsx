import * as React from "react";
import { Form } from 'reactstrap';
import { InputDescComponent } from '../../../components/InputDescComponent';
import { InputLowerTextComponent } from '../../../components/InputLowerTextComponent';
import { InputNameTextComponent } from '../../../components/InputNameTextComponent';
import { VariableTypeChoiceComponent } from '../../../components/VariableTypeChoiceComponent';
import { IDataVarDoc } from '../../../data/DomainData';
import { SigleNamedInfoComponent } from '../../../features/Common/presentation/SigleNamedInfoComponent';
export class DataVarInfo extends SigleNamedInfoComponent<IDataVarDoc> {
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
            <VariableTypeChoiceComponent 
              text={this.props.current.vartype}
              busy={this.props.busy}
              prompt={"Type variable:"}
              propname={"vartype"}
              onItemChoosen={this.props.onFieldChanged}
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
}// renderForm
protected canSave(): boolean{
    const p = this.props.current;
    return (p.sigle.trim().length > 0) && (p.name.trim().length > 0) && p.vartype.trim().length > 0 && p.modified;
}
protected hasHeader(): boolean {
    return true;
  }
  protected renderHeader(): React.ReactNode {
    const p = this.props.current;
    return <span className="text-center">{p.sigle + " " + p.name}</span>;
  }
} // class UniteInfo
