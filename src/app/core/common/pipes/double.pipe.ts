import {Pipe, PipeTransform} from '@angular/core';

export enum NumberFragment {
  whole = 'WHOLE_NUMBER',
  fractional = 'FRACTIONAL_NUMBER',
}

@Pipe({
  name: 'decimalNumber',
})
export class DoublePipe implements PipeTransform {
  transform(value: number | null | undefined, fragment: NumberFragment): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    const [whole, fractional] = value.toString().split('.');
    if (fragment == NumberFragment.whole) {
      console.log(`${value} the whole is ${value} `);
      return whole;
    } else {

      return parseInt(fractional) == 0 ? '' : fractional;
    }
  }
}
