import { Pipe, PipeTransform } from '@angular/core';


/**
 * Generated class for the IsNewPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'isNew',
})
export class IsNewPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return new Date(value) > new Date();
  }
}
