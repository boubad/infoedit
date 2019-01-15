import * as React from "react";
import { Input } from "reactstrap";
import { BaseComponent } from './BaseComponent';
//
interface IMyEvent extends EventTarget {
  target: { files: any; result: any };
}
//
export interface IInputFileComponentProps {
  accept?: string;
  busy:boolean;
  onFileSelected?: (name: string, mime: string, data: Blob | Buffer) => void;
}
//
export class InputFileComponent extends BaseComponent<IInputFileComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  public render(): React.ReactNode {
    const accept = (this.props.accept !== undefined) ? this.props.accept : '';
    if (accept.length > 0) {
      return (
        <Input
          className={this.getLinkStyle(this.props.busy)}
          type="file"
          accept={accept}
          onChange={this.handleChange}
        />
      );
    } else {
      return (
        <Input
        className={this.getLinkStyle(this.props.busy)}
          type="file"
          onChange={this.handleChange}
        />
      );
    }
  } // render
  private handleChange(e: any) {
    const event = e as IMyEvent;
    const files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      const file = files[0];
      const fr = new FileReader();
      fr.onloadend = (ex: any) => {
        if (
          this.props.onFileSelected !== undefined &&
          this.props.onFileSelected !== null
        ) {
          this.props.onFileSelected(
            file.name,
            file.type,
            new Blob([new Uint8Array(ex.target.result)])
          );
        }
      };
      fr.readAsArrayBuffer(file);
    } // files
  } // handleChange
}
