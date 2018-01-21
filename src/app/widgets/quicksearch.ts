import {Component} from "@angular/core";
import {SearchService} from "../services/search.service";

@Component({
    selector: 'quicksearch',
    template: `
        <div class="input-widget" [class.show-dropdown]="showPopup">
            <div class="input">
                <input #query (keyup)="textChanged(query.value)">
                <div class="input-widget-dropdown">
                    <div class="inset-tiny">
                        Popup content, currently hidden
                    </div>
                </div>
            </div>
            <button class="input-widget-button">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>`
})
export class QuickSearchComponent {

    private text: string;
    private showPopup: boolean;

    constructor(private searchService: SearchService) {

    }

    textChanged(value: string): void {
        if (this.text == value.trim()){
            // text hasn't changed
            return;
        }
        this.text = value.trim();
        this.showPopup = false;
        this.searchService.search(this.text).subscribe(result => {
            console.log("Got result :" + result.strategy.getId() + ": " + JSON.stringify(result.items));
        });
    }
}