import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray',
  standalone: true,
})
export class NumberToArrayPipe implements PipeTransform {
  transform(length: number): number[] {
    if (!length) {
      return [];
    }
    const array = [];
    for (let n = 1; n < length + 1; ++n) {
      array.push(n);
    }
    return array;
  }
}
