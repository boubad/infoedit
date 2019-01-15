import * as React from "react";
import { Input } from "reactstrap";
import { InputItemComponent } from "./InputItemComponent";

export class InputEmailComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderItem(): React.ReactNode {
    const p = this.props;
      return (
        <Input
          className={this.getLinkStyle(this.state.busy)}
          id={p.propname}
          type="email"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
        />
      );
  } // renderItem
} // class InputDescComponent
//
