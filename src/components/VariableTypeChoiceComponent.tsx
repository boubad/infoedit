import * as React from "react";
import { BaseComponent } from "./BaseComponent";
import { ItemChoiceComponent } from "./InputChoiceComponent";
//
export interface IVariableTypeChoiceComponentOptions {
  text: string;
  busy: boolean;
  prompt?: string;
  propname?: string;
  onItemChoosen?: (val: any, propname: string) => void;
}
//
const statusOptions: any[] = [
  { id: "", text: "" },
  { id: "string", text: "Catégories" },
  { id: "number", text: "Numérique" },
  { id: "ident", text: "Identité" },
  { id: "info", text: "Information" }
];
//
export class VariableTypeChoiceComponent extends BaseComponent<
  IVariableTypeChoiceComponentOptions
> {
  constructor(props?: any) {
    super(props);
  } // constructor

  public render(): React.ReactNode {
    const p = this.props;
    const prompt =
      p.prompt !== undefined && p.prompt !== null ? p.prompt : "Type:";
    const propname =
      p.propname !== undefined && p.propname !== null ? p.propname : "vartype";
    return (
      <ItemChoiceComponent
        text={p.text}
        items={statusOptions}
        prompt={prompt}
        propname={propname}
        busy={p.busy}
        onItemChoosen={this.props.onItemChoosen}
      />
    );
  } // render
} // class  VariableTypeChoiceComponent
