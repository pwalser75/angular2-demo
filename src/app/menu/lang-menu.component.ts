import {Component} from "@angular/core";
import {ApplicationService, User} from "../services/application.service";
import {TranslateService} from "../services/translate.service";

@Component({
    selector: 'lang-menu',
    templateUrl: 'templates/lang-menu.html'
})
export class LanguageMenuComponent {

    constructor(private translateService: TranslateService) {
    }

}
