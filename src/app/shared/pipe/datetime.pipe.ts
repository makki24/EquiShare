import {Pipe, PipeTransform} from "@angular/core";
import {formatDate} from "date-fns";

@Pipe({
  standalone: true,
  name: 'dateTime'
})
export class DatetimePipe implements PipeTransform {
  transform(date: Date, pattern: string): string {
    return formatDate(date, pattern)
  }
}
