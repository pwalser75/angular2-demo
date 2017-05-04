import {Component} from "@angular/core";
import {ApplicationService} from "../services/application.service";

@Component({
    selector: 'app-menu',
    templateUrl: 'templates/app-menu.html'
})
export class AppMenuComponent {

    constructor(private applicationService: ApplicationService) {
    }
}

