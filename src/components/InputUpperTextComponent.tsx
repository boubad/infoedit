import { InputItemComponent } from "./InputItemComponent";
export class InputUpperTextComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected filterText(s: string): string {
    return s.toUpperCase();
  } // filterText
} // class InputUpperTextComponent
