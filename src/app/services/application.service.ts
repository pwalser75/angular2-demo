import {Injectable} from "@angular/core";

@Injectable()
export class ApplicationService {

    user: User;

    constructor() {

    }

    login() {
        this.user = {
            name: "Test User"
        }
    }

    logout() {
        this.user = null;
    }

    getUser():User{
        return this.user;
    }
}

export interface User {
    name: string;
}
