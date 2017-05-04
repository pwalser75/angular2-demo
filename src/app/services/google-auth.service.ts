import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {MessagesService, Severity, Message} from "./messages.service";

declare var gapi: any;

export enum AuthenticationEventType {
    LOGIN,
    LOGOUT
}

export class AuthenticationEvent {
    constructor(public type: AuthenticationEventType, public user: string) {
    }
}

@Injectable()
export class GoogleAuthService {

    static clientId = '717388871185-4vnc6f1hl22dkbqm1nn6u78psmif8p1m.apps.googleusercontent.com';
    static apiKey = 'AIzaSyBIsyIvV_0QNfNualnDqB-k1toHt-RTYu4';
    static scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar.readonly'];
    static logoutUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';

    public userName: string;
    public userImageUrl: string;

    private eventSource: Subject<AuthenticationEvent> = new Subject<AuthenticationEvent>();
    public events: Observable<AuthenticationEvent> = this.eventSource.asObservable();

    constructor(private messageService: MessagesService) {
        this.internalAuthenticate(true);
    }

    login() {
        this.internalAuthenticate(false);
    }

    logout() {
        this.messageService.publish(new Message(Severity.WARNING, "Google Auth", "User logged out"));
        this.setUserData(null, null);
        gapi.auth.signOut();
    }

    public isAuthenticated(): boolean {
        return this.userName != null;
    }

    private internalAuthenticate(immediate: boolean) {
        return this.proceedAuthentication(immediate)
            .then(() => this.initializeGooglePlusAPI())
            .then(() => this.initializeGoogleCalendarAPI())
            .then(() => this.loadGooglePlusUserData())
            .then((response: any) => this.setUserData(response.result.displayName, response.result.image.url))
            .catch((error: any) => {
                this.messageService.publish(new Message(Severity.ERROR, "Google Auth", "Authentication failed: " + JSON.stringify(error)));
            });
    }

    private proceedAuthentication(immediate: boolean) {
        return new Promise((resolve, reject) => {
            gapi.client.setApiKey(GoogleAuthService.apiKey);
            var authorisationRequestData = {
                'client_id': GoogleAuthService.clientId,
                'scope': GoogleAuthService.scopes,
                'cookie_policy': 'single_host_origin',
                'immediate': immediate
            };
            gapi.auth.authorize(authorisationRequestData,
                (authenticationResult: any) => {
                    if (authenticationResult && !authenticationResult.error) {
                        this.setUserData('unknown', null);
                        resolve();
                    } else {
                        this.setUserData(null, null);
                        reject();
                    }
                }
            );
        });
    }

    private initializeGooglePlusAPI() {
        return new Promise((resolve, reject) => {
            console.log('initialize Google Plus API');
            resolve(gapi.client.load('plus', 'v1'));
        });
    }

    private initializeGoogleCalendarAPI() {
        return new Promise((resolve, reject) => {
            console.log('initialize Google Calendar API');
            resolve(gapi.client.load('calendar', 'v3'));
        });
    }

    private loadGooglePlusUserData() {
        return new Promise((resolve, reject) => {
            console.log('load Google Plus data');
            resolve(gapi.client.plus.people.get({'userId': 'me'}));
        });
    }

    private setUserData(userName: string, userImageUrl: string) {
        this.userName = userName;
        this.userImageUrl = userImageUrl;

        if (userName) {
            this.emitEvent(new AuthenticationEvent(AuthenticationEventType.LOGIN, userName));
        } else if (this.userName) {
            this.emitEvent(new AuthenticationEvent(AuthenticationEventType.LOGOUT, null));
        }
    }

    private emitEvent(event: AuthenticationEvent) {
        if (this.eventSource && event) {
            this.eventSource.next(event);
        }
    }
}