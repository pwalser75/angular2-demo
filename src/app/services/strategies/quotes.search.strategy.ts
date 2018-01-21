import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {SearchStrategy} from "../search.service";
import {Quote, QuotesService} from "../quotes.service";

@Injectable()
export class QuoteSearchStrategy implements SearchStrategy {

    private limit: number = 3;

    constructor(private quotesService: QuotesService) {
    }

    getId(): string {
        return "quotes";
    }

    search(query: string): Observable<Object[]> {
        console.log("QuoteSearchStrategy: search for " + query);
        query = query.toLowerCase();

        return new Observable<Object[]>(observer => {

            setTimeout(() => {
            this.quotesService.getQuotes().then(
                data => {
                    let matches: Quote[] = data
                        .filter(q => this.matches(q, query));

                    // limit number of items
                    matches = matches.slice(0, Math.min(this.limit, matches.length));
                    observer.next(matches);
                },
                error => observer.error(error)
            );
            }, 1500);
        });
    }

    private matches(quote: Quote, query: string): boolean {
        if (!query || !quote) {
            return false;
        }
        return query.split(" ")
            .every(term =>
                this.containsTerm(quote.text, term) || // by text
                this.containsTerm(quote.author, term) // by author
            );
    }

    private containsTerm(text: string, term: string): boolean {
        if (!text || !term) {
            return false;
        }
        return text.toLowerCase()
            .split(" ")
            .some(s => s.startsWith(term.toLowerCase()));
    }
}