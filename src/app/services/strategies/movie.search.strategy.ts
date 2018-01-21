import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {SearchStrategy} from "../search.service";
import {Movie, MovieService} from "../movie.service";

export class MovieSearchResult {

    constructor(public id: number, public title: string, public year: number) {
    }
}

@Injectable()
export class MovieSearchStrategy implements SearchStrategy {

    constructor(private movieService: MovieService) {
    }

    getId(): string {
        return "movies";
    }

    search(query: string): Observable<Object[]> {
        console.log("MovieSearchStrategy: search for " + query);
        query = query.toLowerCase();

        return new Observable<Object[]>(observer => {
            setTimeout(() => {

                return new Promise((resolve, reject) => {
                    this.movieService.getMovies().then(
                        data => {
                            let matches: MovieSearchResult[] = data
                                .filter(m => this.matches(m, query))
                                .map(m => new MovieSearchResult(m.id, m.title, m.year));
                            observer.next(matches);
                        },
                        error => reject(error)
                    );
                });
            }, 500);
        });
    }

    private matches(movie: Movie, query: string): boolean {
        if (!query || !movie) {
            return false;
        }
        return query.split(" ")
            .every(term => this.containsTerm(movie.title, term) || String(movie.year) == term);
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