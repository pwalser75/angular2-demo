import {Component, OnInit, OnDestroy} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {MovieService, Movie} from "../../services/movie.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'movie',
    templateUrl: 'templates/movie-detail.html'
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movie: Movie;
    private sub: any;

    constructor(private movieService: MovieService, private route: ActivatedRoute, private titleService: Title) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            var id = +params['id']; // (+) converts string 'id' to a number
            this.movie = this.movieService.getMovie(id);
            this.titleService.setTitle(this.movie ? this.movie.title + "(" + this.movie.year + ")" : 'no movie');
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
