import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { BaseComponent } from "./BaseComponent";

export interface INumberInputComponenProps {
  value: number | null;
  propname: string;
  prompt: string;
  busy: boolean;
  onNumberChanged?: (note: any, propname?: string) => void;
}
interface INumberInputState {
  busy: boolean;
  note: number | null;
  text: string;
}
export class InputNumberComponent extends BaseComponent<
  INumberInputComponenProps,
  INumberInputState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      busy: false,
      note: null,
      text: ""
    };
    this.onChanged = this.onChanged.bind(this);
    this.onFocus = this.onFocus.bind(this);
  } // constructor
  public componentDidMount() {
    this.setState({
      busy: this.props.busy,
      note: this.props.value,
      text:
        this.props.value !== undefined && this.props.value !== null
          ? "" + this.props.value
          : ""
    });
  } // componentDidMount
  public componentWillReceiveProps(nextProps: INumberInputComponenProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        note: nextProps.value,
        text:
          nextProps.value !== undefined && nextProps.value !== null
            ? "" + nextProps.value
            : ""
      });
    }
    if (nextProps.busy !== this.props.busy) {
      this.setState({
        busy: nextProps.busy
      });
    }
  } //
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <FormGroup>
        <Label for={p.propname} sm={1}>
          {p.prompt}
        </Label>
        {this.renderItem()}
      </FormGroup>
    );
  } // render
  protected renderItem(): React.ReactNode {
    const p = this.props;
    return (
      <Input
        className={this.getLinkStyle(this.state.busy)}
        id={p.propname}
        type="text"
        value={this.state.text}
        onChange={this.onChanged}
        onBlur={this.onFocus}
      />
    );
  } // renderItem
  protected filterNumber(n: number): boolean {
    return n >= 0.0;
  } // filterNumber
  private onChanged(e: any) {
    const s: string = e.target.value;
    let n: number | null = null;
    const v = parseFloat(s);
    if (!isNaN(v)) {
      if (this.filterNumber(v)) {
        n = v;
      }
    }
    this.setState({
      note: n,
      text: s
    });
  } // onTextChanged
  private onFocus(e: any) {
    if (
      this.props.onNumberChanged !== undefined &&
      this.props.onNumberChanged !== null
    ) {
      if (this.state.note !== this.props.value) {
        this.props.onNumberChanged(this.state.note, this.props.propname);
      }
    }
  } // onFocus
} // class InputUpperTextComponent
