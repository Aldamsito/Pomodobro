import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value <= 9)
      return `0${value}`;
    return `${value}`;
  }
}
