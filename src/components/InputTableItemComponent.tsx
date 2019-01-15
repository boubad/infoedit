import * as React from "react";
import { Input } from "reactstrap";
import { BaseComponent } from "./BaseComponent";

interface IInputTableItemComponentProp {
  index: string;
  text: string;
  propname: string;
  busy: boolean;
  onValueChanged?: (index: string, val: any, propname: string) => any;
}
interface IInputTableItemComponentState {
  busy: boolean;
  text: string;
}

export class InputTableItemComponent extends BaseComponent<
  IInputTableItemComponentProp,
  IInputTableItemComponentState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      busy: false,
      text: ""
    };
    this.onChanged = this.onChanged.bind(this);
    this.onFocus = this.onFocus.bind(this);
  } // constructor
  public componentDidMount() {
    this.setState({
      busy: this.props.busy,
      text: this.props.text
    });
  } // componentDidMount
  public componentWillReceiveProps(nextProps: IInputTableItemComponentProp) {
    if (nextProps.text !== this.props.text) {
      this.setState({
        text: nextProps.text
      });
    }
    if (nextProps.busy !== this.props.busy) {
      this.setState({
        busy: nextProps.busy
      });
    }
  } // nextProps
  public render() {
    return (
      <Input
        className={this.getLinkStyle(this.state.busy)}
        type="text"
        value={this.state.text}
        onChange={this.onChanged}
        onBlur={this.onFocus}
      />
    );
  } // render
  protected onChanged(e: any) {
    const s: string = e.target.value;
    this.setState({
      text: s
    });
  } // onTextChanged
  protected onFocus() {
    if (this.state.text !== this.props.text) {
      if (
        this.props.onValueChanged !== undefined &&
        this.props.onValueChanged !== null
      ) {
        this.props.onValueChanged(
          this.props.index,
          this.state.text,
          this.props.propname
        );
      }
    }
  } // onFocus
} // class InputItemComponent
//
