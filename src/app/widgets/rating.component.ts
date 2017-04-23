import {Component, Input} from "@angular/core";

@Component({
    selector: 'rating',
    template: `
	<span>
		<i *ngFor="let item of createRangeArray(1, getStarsFilled())" class="fa fa-star" style="color:#FFC901"></i>
		<i *ngFor="let item of createRangeArray(getStarsFilled()+1, getStarsMax())" class="fa fa-star-o" style="color:#DDDDDD"></i>
	</span>
	`
})
export class RatingComponent {
    @Input() value:number;
    @Input() max:number;

    getStarsMax() {
        return this.max;
    }

    getStarsFilled() {
        return Math.round(this.value);
    }

    createRangeArray(min:number, max:number) {
        return new Array<number>(max - min + 1).map((x:number, i:number)=>i + min);
    }
}