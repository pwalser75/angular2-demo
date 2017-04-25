import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Rx";

export interface Movie {
    id: number;
    title: string;
    year: number;
    genres: string[];
    rating: number;
    image: string;
    plot: string;
}

@Injectable()
export class MovieService {

    movies: Movie[];
    private loadingDone = new Subject <boolean>();

    constructor(http: Http) {

        let resource: string = "app/data/movies.json";
        console.log("Loading: " + resource);

        http.get(resource)
            .map((res: any) => res.json()).subscribe(
            data => this.movies = data,
            error => console.log(error),
            () => {
                this.loadingDone.next(true);
                this.loadingDone = null
            }
        );
    }

    getMovies(): Movie[] {
        return this.movies;
    }

    getMovie(id: Number): Promise<Movie> {
        let result: Promise<Movie> = new Promise((resolve, reject) => {
            if (this.loadingDone) {
                this.loadingDone.subscribe(
                    data => resolve(this.movies.find(m => m.id == id)),
                    errror => reject("Movies not loaded")
                );
            } else if (this.movies) {
                resolve(this.movies.find(m => m.id == id));
            } else {
                reject("Movies not loaded");
            }
        });

        return result;
    }
}
