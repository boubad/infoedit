import { InputItemComponent } from "./InputItemComponent";
export class InputLowerTextComponent extends InputItemComponent {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected filterText(s: string): string {
    return s.toLowerCase();
  } // filterText
} // class InputLowerTextComponent
