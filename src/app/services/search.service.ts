import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MovieSearchStrategy} from "./strategies/movie.search.strategy";
import {version} from "punycode";

export interface SearchStrategy {

    getId(): string;

    search(query: string): Observable<Object[]>;
}

export class SearchResult {

    constructor(public strategy: SearchStrategy, public version: number, public items: Object[]) {
    }
}

@Injectable()
export class SearchService {

    private searchDelayMs: number = 250;

    private version: number = 0;

    private strategies: SearchStrategy[] = [];

    constructor(private movieSearchStrategy: MovieSearchStrategy) {
        this.strategies.push(movieSearchStrategy);
    }

    public search(query: string): Observable<SearchResult> {
        this.version++;

        return new Observable<SearchResult>(observer => {
            let queryVersion = this.version;

            // delay search
            setTimeout(() => {
                if (queryVersion == this.version) {
                    for (let strategy of this.strategies) {

                        if (query && query.trim()) {
                            strategy.search(query).subscribe(items => {
                                    if (queryVersion == this.version) {
                                        console.log("Got search result with version " + queryVersion);
                                        observer.next(new SearchResult(strategy, version, items));
                                    } else {
                                        // discard results, query was changed in the meantime.
                                    }
                                }
                            )
                        } else {
                            observer.next(new SearchResult(strategy, version, []));
                        }
                    }
                } else {
                    // dont't search, query was changed in the meantime.
                }

            }, this.searchDelayMs);
        });
    }
}