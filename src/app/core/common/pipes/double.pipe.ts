import {Pipe, PipeTransform} from '@angular/core';

export enum NumberFragment {
  whole = 'WHOLE_NUMBER',
  fractional = 'FRACTIONAL_NUMBER',
}

@Pipe({
  name: 'decimalNumber',
})
export class DoublePipe implements PipeTransform {
  transform(value: number | null | undefined, fragment: NumberFragment): number | string {
    if (value === null || value === undefined || isNaN(value)) {
      return 0;
    }
    if (fragment == NumberFragment.whole) {
      return parseInt(value.toFixed());
    } else {
      const [_, fractional] = value.toString().split('.');
      return parseInt(fractional) == 0 ? '' : fractional;
    }
  }
}
