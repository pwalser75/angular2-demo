import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'date', pure: true})
export class DatePipe implements PipeTransform {

    transform(date: Date): string {
        if (!date) {
            return null;
        }
        return date.toLocaleDateString();
    }
}