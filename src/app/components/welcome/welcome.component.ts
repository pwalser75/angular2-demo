import {Component} from "@angular/core";
import {ApplicationService, User} from "../../services/application.service";

@Component({
    selector: 'welcome',
    templateUrl: 'templates/welcome.html'
})
export class WelcomeComponent {

    title:string;
    message:string;
    applicationService:ApplicationService;

    constructor(private _applicationService:ApplicationService) {
        this.title = "Angular2 Demo";
        this.message = "Hello from Angular";
        this.applicationService = _applicationService
    }

    getUser():User {
        return this.applicationService.getUser();
    }
}