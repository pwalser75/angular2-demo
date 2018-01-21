import {Component, Input} from "@angular/core";
import {ImageSearchResult} from "./images.search.strategy";

@Component({
    selector: 'image-search-result-list',
    template: `
        <div *ngIf="items == null" class="inset-base">
            <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        </div>
        <div class="grid gutter inset-small" style="min-width: 400px">
            <div class="col-4" *ngFor="let image of items">
                <div class="card full-height card-primary material-shadow-1">
                    <div class="media aspect16to9">
                        <img class="image-contain" [src]="image.url">
                    </div>
                    <div class="content single-line text-tiny">
                        {{image.name}}
                    </div>
                </div>
            </div>
        </div>`
})
export class ImageSearchResultList {

    @Input() items: ImageSearchResult[];
}
