import {Component} from "@angular/core";
import {ApplicationService} from "../../services/application.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: 'templates/login.html'
})
export class LoginComponent {

    form:FormGroup;
    user:string;
    password:string;

    constructor(fb:FormBuilder, private applicationService:ApplicationService, private router:Router) {
        this.form = fb.group(
            {
                "user": ['', Validators.compose(
                    [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
                )],
                "password": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
                )]
            }
        );

    }

    login() {
        var data = this.form.value;
        console.log("LOGIN: " + JSON.stringify(data));
        this.applicationService.login(data.user, data.password);

        console.log("Logged in as: " + JSON.stringify(data.user) + " with credentials " + JSON.stringify(data.password));
        this.router.navigate(['/welcome']);
    }
}