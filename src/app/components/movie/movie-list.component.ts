import {Component} from "@angular/core";
import {MovieService, Movie} from "../../services/movie.service";

@Component({
    selector: 'movies',
    templateUrl: 'templates/movie-list.html'
})
export class MovieListComponent {

    constructor(private movieService: MovieService) {
    }
}
