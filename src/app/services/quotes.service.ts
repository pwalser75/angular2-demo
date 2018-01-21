import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

export interface Quote {
    text: string;
    author: string;
}

@Injectable()
export class QuotesService {

    private quotes: Promise<Quote[]>;

    constructor(http: Http) {

        let resource: string = "data/quotes.json";

        this.quotes = new Promise((resolve, reject) => {
            http.get(resource)
                .map((res: any) => res.json()).subscribe(
                data => resolve(data),
                error => reject(error)
            );
        });
    }

    getQuotes(): Promise<Quote[]> {
        return this.quotes;
    }
}