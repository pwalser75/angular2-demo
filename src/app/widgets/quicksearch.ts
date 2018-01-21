import {Component} from "@angular/core";
import {SearchService} from "../services/search.service";
import {MovieSearchResultList} from "../services/strategies/movie.search.result.list";

@Component({
    selector: 'quicksearch',
    entryComponents: [MovieSearchResultList],
    template: `
        <div class="input-widget" [class.show-dropdown]="showPopup">
            <div class="input">
                <input #query (keyup)="textChanged(query.value)">
                <div class="input-widget-dropdown">
                    <movie-search-result-list [items]="searchResultsMap['movies']"></movie-search-result-list>
                </div>
            </div>
            <button class="input-widget-button">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>`
})
export class QuickSearchComponent {

    private text: string;
    public showPopup: boolean;
    public searchResultsMap: any = {}; // map of search results: key = search strategy id, value = result list

    constructor(private searchService: SearchService) {

    }

    textChanged(value: string): void {
        if (this.text == value.trim()) {
            // text hasn't changed
            return;
        }
        // clear search results
        this.searchResultsMap = {};

        this.text = value.trim();
        this.showPopup = false;
        this.searchService.search(this.text).subscribe(result => {

            console.log("Got result :" + result.strategy.getId() + ": " + JSON.stringify(result.items));
            this.searchResultsMap[result.strategy.getId()] = result.items;
            this.showPopup = result.items && result.items.length > 0;
        });
    }
}