import {Component} from "@angular/core";
import {ApplicationService} from "../services/application.service";

@Component({
    selector: 'user-menu',
    templateUrl: 'templates/user-menu.html'
})
export class UserMenuComponent {

    constructor(private applicationService:ApplicationService) {
    }

}

