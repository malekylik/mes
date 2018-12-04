import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(values: any[], ...args: string[]): string {
    let result: string = '';

    for (let i = 0; i < values.length; i++) {
      if (i !== 0) {
        result += ', ';
      }

      let str: any = values[i];

      for (let j = 0; j < args.length; j++) {
        str = str[args[j]];
      }

      result += str.toString();
    }

    return result.trim();
  }

}
