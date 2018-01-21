import {Component, Input} from "@angular/core";

@Component({
    selector: 'movie-search-result-list',
    template: `
        <ul class="list list-icons" *ngFor="let movie of items">
            <a href="javascript:void(0)" [routerLink]="['/movie', movie.id]">
                <li>
                    <div class="list-icon">
                        <img [src]="movie.image">
                    </div>
                    <span>
                        <div class="single-line"><b>{{movie.title}}</b> ({{movie.year}})</div>
                        <div class="single-line text-small">{{movie.genres | commaSeparated}}</div>
                    </span>
                </li>
            </a>
        </ul>`
})
export class MovieSearchResultList {

    @Input() items: any[];
}