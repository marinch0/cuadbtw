import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pru'
})
export class PruPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
