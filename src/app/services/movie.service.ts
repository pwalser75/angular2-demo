import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, from} from "rxjs";
import {map} from "rxjs/operators";

export interface Movie {
    id: number;
    title: string;
    year: number;
    genres: string[];
    rating: number;
    image: string;
    plot: string;
    youtubeTrailerId: string;
}

@Injectable()
export class MovieService {

    private movies: Promise<Movie[]>;

    constructor(http: HttpClient) {

        let resource: string = "data/movies.json";
        this.movies =http.get<Movie[]>(resource).toPromise();
    }

    getMovies(): Promise<Movie[]> {
        return this.movies;
    }

    getMovie(id: Number): Promise<Movie> {
        return new Promise((resolve, reject) => {
            this.getMovies().then(
                data => resolve(data.find(m => m.id === id)),
                error => reject(error)
            );
        });
    }
}
