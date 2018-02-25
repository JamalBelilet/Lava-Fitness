import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ObjectToArrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'objectToArray',
})
export class ObjectToArrayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, ...args) {

    if(value) {
      let array = (value as any).data;

      function* values(obj) {
        for (let prop of Object.keys(obj))
          yield obj[prop]
      }

      return Array.from(values(array));

      // console.log(arr);
    }
    return;

  }
}
