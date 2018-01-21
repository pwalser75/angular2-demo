import {Component, Input} from "@angular/core";

@Component({
    selector: 'quotes-search-result-list',
    template: `
        <ul class="list list-icons">
            <li *ngFor="let quote of items">
                <div class="list-icon">
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                </div>
                <div class="text-tiny ">
                    {{quote.text}}<br>
                    -&nbsp;<i>{{quote.author}}</i>
                </div>
            </li>
        </ul>`
})
export class QuotesSearchResultList {

    @Input() items: any[];
}