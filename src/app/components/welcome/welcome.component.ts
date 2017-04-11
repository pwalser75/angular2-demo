import {Component} from "@angular/core";

@Component({
    selector: 'welcome',
    templateUrl: 'templates/welcome.html'
})
export class WelcomeComponent {

    title: string;
    message: string;
    userContext: UserContext;

    constructor() {
        this.title = "WelcomeController";
        this.message = "Hello from Angular";
        this.userContext = {
            user: {
                name: "Nathan"
            }
        };
    }
}

interface UserContext {
    user: User;
}
interface User {
    name: string;
}
