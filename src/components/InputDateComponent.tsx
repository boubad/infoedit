import * as React from "react";
import { Input } from "reactstrap";
import { InputItemComponent } from "./InputItemComponent";

export class InputDateComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderItem(): React.ReactNode {
    const p = this.props;
    if (p.min !== undefined && p.max !== undefined) {
      return (
        <Input
          className={this.getLinkStyle(this.state.busy)}
          id={p.propname}
          type="date"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
          min={p.min}
          max={p.max}
        />
      );
    } else if (p.min !== undefined) {
      return (
        <Input
          className={this.getLinkStyle(this.state.busy)}
          id={p.propname}
          type="date"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
          min={p.min}
        />
      );
    } else if (p.max !== undefined) {
      return (
        <Input
          className={this.getLinkStyle(this.state.busy)}
          id={p.propname}
          type="date"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
          max={p.max}
        />
      );
    } else {
      return (
        <Input
          className={this.getLinkStyle(this.state.busy)}
          id={p.propname}
          type="date"
          value={this.state.text}
          onChange={this.onChanged}
          onBlur={this.onFocus}
        />
      );
    }
  } // renderItem
} // class InputDateComponent
//
