import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'datetime', pure: true})
export class DateTimePipe implements PipeTransform {

    transform(date: Date): string {
        if (!date) {
            return null;
        }
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}