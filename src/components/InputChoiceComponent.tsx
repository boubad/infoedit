import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { BaseComponent } from "./BaseComponent";
//
export interface IItemChoiceComponentProps {
  text: string;
  items: any[];
  prompt: string;
  propname: string;
  busy: boolean;
  onItemChoosen?: (val: any, propname?: string) => void;
}
//
export class ItemChoiceComponent extends BaseComponent<IItemChoiceComponentProps> {
  constructor(props?: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
  } // constructor
  public render(): React.ReactNode {
    const gg: any[] = this.props.items;
    if (gg.length < 1) {
      return null;
    }
    const x = gg[0];
    if (gg.length === 1 && x.id === "") {
      return null;
    }
    return (
      <FormGroup>
        <Label for={this.props.propname}>{this.props.prompt}</Label>
        <Input
          className={this.getInfoStyle()}
          readOnly={this.props.busy}
          id={this.props.propname}
          type="select"
          onChange={this.onChange}
          value={this.props.text}
        >
          {gg.map(g => {
            return (
              <option key={g.id} value={g.id}>
                {g.text}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  } // render
  private onChange(e: any) {
    const s: string = e.target.value;
    if (s !== this.props.text) {
      if (
        this.props.onItemChoosen !== undefined &&
        this.props.onItemChoosen !== null
      ) {
        this.props.onItemChoosen(s, this.props.propname);
      }
    }
  } // onChange
} // ItemChoiceComponent
