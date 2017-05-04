import {Injectable} from "@angular/core";
import {MessagesService, Severity, Message} from "./messages.service";
import {GoogleAuthService, AuthenticationEvent, AuthenticationEventType} from "./google-auth.service";


export interface User {
    name: string;
    profilePictureURL: string;
}

@Injectable()
export class ApplicationService {

    private user: User;

    constructor(private messagesService: MessagesService, private googleAuthService: GoogleAuthService) {
        googleAuthService.events.subscribe((event: AuthenticationEvent) => {
            if (event.type === AuthenticationEventType.LOGIN) {
                this.user = {
                    name: googleAuthService.userName,
                    profilePictureURL: googleAuthService.userImageUrl
                };
            }
            if (event.type === AuthenticationEventType.LOGOUT) {
                this.user = null;
            }
        });
    }

    login(name: string, password: string): void {
        this.user = {
            name: name,
            profilePictureURL: null
        };
        this.messagesService.publish(new Message(Severity.SUCCESS, "Login", "User " + name + " logged in"));
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