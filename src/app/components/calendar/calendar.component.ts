import {Component} from "@angular/core";
import {GoogleCalendarService} from "../../services/google-calendar.service";
import {LoginService, LoginEvent, LoginEventType} from "../../services/login.service";
import {GoogleAuthService} from "../../services/google-auth.service";

@Component({
    templateUrl: 'templates/calendar.html'
})
export class CalendarComponent {

    appointments: Array<string>;

    constructor(private loginService: LoginService,
                private calendarService: GoogleCalendarService,
                private authService: GoogleAuthService) {

        if (!loginService.checkAuthenticatedRoute()) {
            return;
        }

        this.appointments = [];

        loginService.events.subscribe((event: LoginEvent) => {
            if (event.type === LoginEventType.LOGIN) {
                this.refresh();
            }
            if (event.type === LoginEventType.LOGOUT) {
                this.appointments = [];
            }
        });
        this.refresh();
    }

    refresh() {
        this.calendarService.loadAppointments().then((appointments: any) => {
            this.appointments = appointments;
        });
    }
}