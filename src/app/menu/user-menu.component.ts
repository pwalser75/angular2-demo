import {Component} from "@angular/core";
import {ApplicationService, User} from "../services/application.service";

@Component({
    selector: 'user-menu',
    templateUrl: 'templates/user-menu.html'
})
export class UserMenuComponent {
    applicationService: ApplicationService;

    constructor(private _applicationService: ApplicationService) {
        this.applicationService = _applicationService
    }

    getUser(): User {
        return this.applicationService.getUser();
    }

    login() {
        this.applicationService.login();
    }

    logout() {
        this.applicationService.logout();
    }
}

