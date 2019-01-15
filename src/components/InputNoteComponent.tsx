import { InputNumberComponent } from './InputNumberComponent';

export class InputNoteComponent extends InputNumberComponent {
    constructor(props?: any) {
        super(props);
      } // constructor
      protected filterNumber(n: number): boolean {
        return (n >= 0.0 && n <= 20.0);
      } // filterNumber
}