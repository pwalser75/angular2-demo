import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'time', pure: true})
export class TimePipe implements PipeTransform {

    transform(date: Date): string {
        if (!date) {
            return null;
        }
        return date.toLocaleTimeString();
    }
}