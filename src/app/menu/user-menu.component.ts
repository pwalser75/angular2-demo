import {Component} from "@angular/core";
import {ApplicationService} from "../services/application.service";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'user-menu',
    templateUrl: 'templates/user-menu.html'
})
export class UserMenuComponent {

    constructor(private applicationService: ApplicationService, private loginService: LoginService) {
    }

}

