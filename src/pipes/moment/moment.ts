import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "moment"
})
export class MomentPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (args.length > 0) {
      if (args[0] == "day") return moment(value).format("dddd");
      if (args[0] == "time") return moment(value).format("h:mm:ss");
    }
    return moment(value).calendar();
  }
}
