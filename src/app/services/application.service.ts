import {Injectable} from "@angular/core";

@Injectable()
export class ApplicationService {

    user:User;

    constructor() {

    }

    login(name:string, password:string):void {
        this.user = {
            name: name
        };
    }

    logout():void {
        this.user = null;
    }

    getUser():User {
        return this.user;
    }
}

export interface User {
    name:string;
}
