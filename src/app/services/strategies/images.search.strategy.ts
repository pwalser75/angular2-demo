import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {from, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {SearchStrategy} from "../search.service";

export interface ImageSearchResult {
    name: string;
    keywords: string;
    url: string;
}

@Injectable()
export class ImagesSearchStrategy implements SearchStrategy {

    private limit: number = 4;

    constructor(private http: HttpClient) {
    }

    getId(): string {
        return "images";
    }

    search(query: string): Observable<Object[]> {
        console.log("ImagesSearchStrategy: search for " + query);
        query = query.toLowerCase();

        let resource: string = "data/image-search.json";

        return this.http.get<ImageSearchResult[]>(resource).pipe(
            map(
                data => {
                    let matches: ImageSearchResult[] = data
                        .filter(q => this.matches(q, query));

                    // limit number of items
                    return matches.slice(0, Math.min(this.limit, matches.length));
                }
            ));

    }

    private matches(image: any, query: string): boolean {
        if (!query || !image) {
            return false;
        }
        return query.split(" ")
            .every(term =>
                image.name.split(/[\s\-]+/).some(s => s.startsWith(term.toLowerCase())) || // by name
                image.keywords.split(/\s*,\s*/).some(s => s.startsWith(term.toLowerCase())) // by keyword
            );
    }
}