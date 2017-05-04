import {Injectable} from "@angular/core";

declare var gapi: any;

@Injectable()
export class GoogleCalendarService {

    loadAppointments() {
        return new Promise((resolve, reject) => {

            var request = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            });

            request.execute((response: any) => {
                var appointments = [];
                var events = response.items;
                console.log(JSON.stringify(events));
                var i;
                if (events.length > 0) {
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        var when = event.start.dateTime;
                        if (!when) {
                            when = event.start.date;
                        }
                        appointments.push(event.summary + ' (' + when + ')');
                    }
                } else {
                    appointments.push('No upcoming events found.');
                }
                resolve(appointments);
            });
        });
    }
}