import * as React from "react";
import { FormGroup,Input, Label } from 'reactstrap';
import { BaseComponent } from "./BaseComponent";
//
export interface IInputItemComponentProps {
  text: string;
  prompt: string;
  propname: string;
  busy: boolean;
  min?:string;
  max?:string;
  onTextChanged?: (val: any, propname: string) => any;
}
//
interface IInputItemComponentState {
  busy: boolean;
  text: string;
}
export class InputItemComponent extends BaseComponent<
  IInputItemComponentProps,
  IInputItemComponentState
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
  public componentWillReceiveProps(nextProps: IInputItemComponentProps) {
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
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <FormGroup>
        <Label for={p.propname}>{p.prompt}</Label>
        {this.renderItem()}
      </FormGroup>
    );
  } // render
  protected filterText(s: string): string {
    return s;
  } // filterText
  protected renderItem(): React.ReactNode {
    const p = this.props;
    return (
      <Input
        className={this.getInfoStyle()}
        readOnly={this.state.busy}
        id={p.propname}
        type="text"
        value={this.state.text}
        onChange={this.onChanged}
        onBlur={this.onFocus}
      />
    );
  } // renderItem
  protected onChanged(e: any) {
    const s: string = e.target.value;
    this.setState({
      text: this.filterText(s)
    });
  } // onTextChanged
  protected onFocus(e: any) {
    if (
      this.props.onTextChanged !== undefined &&
      this.props.onTextChanged !== null
    ) {
      const ss = this.state.text.trim();
      if (ss !== this.props.text) {
        this.props.onTextChanged(ss, this.props.propname);
      }
    }
  } // onFocus
} // class InputItemComponent
//
