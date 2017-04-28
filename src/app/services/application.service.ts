import {Injectable} from "@angular/core";
import {MessagesService, Severity, Message} from "./messages.service";

@Injectable()
export class ApplicationService {

    user: User;

    constructor(private messagesService: MessagesService) {

    }

    login(name: string, password: string): void {
        this.user = {
            name: name
        };
        this.messagesService.publish(new Message(Severity.INFO, "Login", "User " + name + " logged in"));
    }

    logout(): void {
        if (this.user) {
            this.user = null;
            this.messagesService.publish(new Message(Severity.WARNING, "Logout", "User " + name + " logged out"));
        }
    }

    getUser(): User {
        return this.user;
    }
}

export interface User {
    name: string;
}
