import {Component} from "@angular/core";
import {GoogleCalendarService} from "../../services/google-calendar.service";
import {GoogleAuthService} from "../../services/google-auth.service";

@Component({
    templateUrl: 'templates/calendar.html'
})
export class CalendarComponent {

    appointments: Array<string>;

    constructor(private authService: GoogleAuthService,
                private calendarService: GoogleCalendarService) {
        this.appointments = [];
        if (authService.isAuthenticated()) {
            this.refreshAppointments();
        }
    }

    refreshAppointments() {
        /*
         * loading the appointments is done asychronously. the service's loadAppointments() method
         * returns a Promise that provides access to the newly loaded set of appointments. Updating
         * the array of appointments triggers angular's one-way-binding between the field and the
         * widget.
         */
        this.calendarService.loadAppointments().then((newAppointments: any) => {
            // clean the array of existing appointments
            this.appointments.splice(0, this.appointments.length);
            // copy all new items to the array of existing appointments
            this.appointments.push.apply(this.appointments, newAppointments);
            console.log('displaying ' + this.appointments.length + ' appointments');
        });
    }
}