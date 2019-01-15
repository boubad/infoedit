import * as React from "react";
import { BaseComponent } from './BaseComponent';
import { ItemChoiceComponent } from './InputChoiceComponent';
//
export interface IEtudiantStatusChoiceComponentOptions {
  text: string;
  busy: boolean;
  prompt?: string;
  propname?: string;
  onItemChoosen?: (val: any, propname: string) => void;
}
//
const statusOptions: any[] = [
  { id: "", text: "" },
  { id: 'free', text: "Non assigné" },
  { id: 'busy', text: "Assigné" },
  { id: 'done', text: "Fermé" },
  { id: 'demission', text: "Démission" }
];
//
export class StatusChoiceComponent extends BaseComponent<IEtudiantStatusChoiceComponentOptions> {
  constructor(props?: any) {
    super(props);
  } // constructor

  public render(): React.ReactNode {
      const p = this.props;
      const prompt = (p.prompt !== undefined && p.prompt !== null) ? p.prompt : "Etat:";
      const propname = (p.propname !== undefined && p.propname !== null) ? p.propname : 'status';
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
} // class  EtudiantStatusChoiceComponent
