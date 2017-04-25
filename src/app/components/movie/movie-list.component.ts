import {Component} from "@angular/core";
import {MovieService, Movie} from "../../services/movie.service";

@Component({
    selector: 'movies',
    templateUrl: 'templates/movie-list.html'
})
export class MovieListComponent {

    movies: Movie[];

    constructor(movieService: MovieService) {
        movieService.getMovies().then(data => this.movies = data);
    }
}
