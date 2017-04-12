import {Component} from "@angular/core";
import {ApplicationService} from "../../services/application.service";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: 'templates/login.html'
})
export class LoginComponent {

    user: string;
    password: string;

    constructor(private applicationService: ApplicationService, private router: Router) {
    }

    login() {

        this.applicationService.login(this.user, this.password);
        console.log("Logged in as: " + JSON.stringify(this.user) + " with credentials " + JSON.stringify(this.password));
        this.router.navigate(['/movies']);
    }
}