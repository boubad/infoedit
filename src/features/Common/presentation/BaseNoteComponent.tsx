import * as React from "react";
import { Form } from "reactstrap";
import { InputDescComponent } from "../../../components/InputDescComponent";
import { InputNoteComponent } from "../../../components/InputNoteComponent";
import { INoteDoc } from "../../../data/DomainData";
import { ItemDetailComponent } from "./ItemDetailComponent";

export class BaseNoteComponent extends ItemDetailComponent<INoteDoc> {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderForm(): React.ReactNode {
    const p = this.props.current;
    return (
      <Form className={this.getInfoStyle()}>
        <InputNoteComponent
          value={p.value}
          prompt="Note:"
          propname="value"
          busy={this.props.busy}
          onNumberChanged={this.props.onFieldChanged}
        />
        <InputDescComponent
          text={p.observations}
          prompt="Remarques:"
          propname="observations"
          busy={this.props.busy}
          onTextChanged={this.props.onFieldChanged}
        />
      </Form>
    );
  } // renderForm
  protected canAdd(): boolean {
    return false;
  }
  protected canRemove(): boolean {
    return false;
  }
  protected hideCancel(): boolean {
    return true;
  }
} // class BaseNoteComponent
