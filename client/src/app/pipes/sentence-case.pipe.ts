import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {

  transform(value: string, exclaim: boolean = false): string {
    if (value) {
      const newValue = value.replace(value.charAt(0), value.charAt(0).toUpperCase());
      if (exclaim) {

        return newValue + '!';
      }
      return newValue;
    }
  }
}
