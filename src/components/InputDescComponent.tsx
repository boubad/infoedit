import * as React from "react";
import { Input } from 'reactstrap';
import { InputItemComponent } from "./InputItemComponent";

export class InputDescComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected filterText(s: string): string {
    let ss = s;
    const n = s.length;
    if (n > 0) {
      if (n > 1) {
        ss = ss.slice(0, 1).toUpperCase() + ss.slice(1, n);
      } else {
        ss = ss.toUpperCase();
      }
    } // n
    return ss;
  } // filterText
  protected renderItem(): React.ReactNode {
    const p = this.props;
    
      return (
        <Input
        className={this.getInfoStyle()}
        readOnly={this.props.busy}
          id={p.propname}
          type="textarea"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
        />
      );
   
  } // renderItem
} // class InputDescComponent
//
