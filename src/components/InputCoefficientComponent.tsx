import { InputNumberComponent } from './InputNumberComponent';

export class InputCoefficientComponent extends InputNumberComponent {
    constructor(props?: any) {
        super(props);
      } // constructor
      protected filterNumber(n: number): boolean {
        return n > 0.0;
      } // filterNumber
}
