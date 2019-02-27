import * as React from "react";
import { Input } from 'reactstrap';
import { InputItemComponent } from "./InputItemComponent";

export class InputPasswordComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderItem(): React.ReactNode {
    const p = this.props;
      return (
        <Input
        className={this.getInfoStyle()}
        readOnly={this.props.busy}
          id={p.propname}
          type="password"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
        />
      );
  } // renderItem
} // class InputPasswordComponent
//
