import {Component, Input, OnChanges, AfterViewInit} from "@angular/core";
import {TranslateService} from "../services/translate.service";

@Component({
    selector: 'input-component',
    templateUrl: 'templates/input-component.html'
})
export class InputComponent implements OnChanges, AfterViewInit {
    @Input() name:any;
    @Input() label:any;
    @Input() errors:any;

    @Input() control:any;
    //@ViewChild(FormControl) control:FormControl;

    errorKey:any;
    errorMessage:any;

    constructor(private translateService:TranslateService) {
    }

    ngAfterViewInit() {
        console.log("CONTROL: " + this.control);
        // this.footer now points to the instance of `FooterComponent`
    }

    ngOnChanges(changes:any):void {

        var errors:any = changes.errors.currentValue;
        var key:string = this.getFirstErrorMessageKey(errors);
        this.errorKey = key;
        if (key) {
            var translated = this.translateService.translate("error." + key);
            this.errorMessage = this.translateService.replacePlaceholders(translated, errors[key]);
        } else {
            this.errorMessage = null;
        }
    }

    getFirstErrorMessageKey(errors:any):string {
        if (!errors) return null;
        for (let key in errors) {
            return key;
        }
    }
}