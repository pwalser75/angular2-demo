import {Injectable} from "@angular/core";
import {GoogleAuthService} from "./google-auth.service";

declare var gapi: any;

export interface CalendarEvent {
    start: Date;
    end: Date;
    subject: string;
}

@Injectable()
export class GoogleCalendarService {

    constructor(private authService: GoogleAuthService) {

    }

    loadAppointments() {
        return this.authService.authenticated()
            .then(() => new Promise<any>((resolve, reject) => {

                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                });

                request.execute((response: any) => {
                    var items = response.items;

                    var result: CalendarEvent[] = new Array();
                    for (let item of items) {
                        result.push({
                            start: new Date(item.start.dateTime),
                            end: new Date(item.end.dateTime),
                            subject: item.summary
                        });
                    }

                    resolve(result);
                });
            }));
    }
}