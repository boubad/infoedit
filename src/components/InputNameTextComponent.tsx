import { InputItemComponent } from './InputItemComponent';

export class InputNameTextComponent extends InputItemComponent  {
  constructor(props?: any) {
    super(props);
  } // constructor
  protected filterText(s: string): string {
    let ss = s;
    const n = s.length;
    if (n > 0) {
      if (n > 1) {
        ss = ss.slice(0, 1).toUpperCase() + ss.slice(1, n);
      } else {
        ss = ss.toUpperCase();
      }
    } // n
    return ss;
  } // filterText
} // class InputNameTextComponent
