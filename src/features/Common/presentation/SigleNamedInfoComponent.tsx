import * as React from "react";
import { Form } from 'reactstrap';
import { InputDescComponent } from 'src/components/InputDescComponent';
import { InputLowerTextComponent } from 'src/components/InputLowerTextComponent';
import { InputNameTextComponent } from 'src/components/InputNameTextComponent';
import { ISigleNamedDoc } from 'src/data/DomainData';
import { BaseInfoComponent } from './BaseInfoComponent';

export class SigleNamedInfoComponent<T extends ISigleNamedDoc> extends BaseInfoComponent<T> {
    constructor(props?:any){
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
        return (p.sigle.trim().length > 0) && (p.name.trim().length > 0) && p.modified;
    }
    protected hasHeader(): boolean {
        return true;
      }
      protected renderHeader(): React.ReactNode {
        const p = this.props.current;
        return <span className="text-center">{p.sigle + " " + p.name}</span>;
      }
}// class SigleNamedInfoComponent
