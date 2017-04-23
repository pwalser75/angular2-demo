import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppMenuComponent} from "./menu/app-menu.component";
import {LanguageMenuComponent} from "./menu/lang-menu.component";
import {UserMenuComponent} from "./menu/user-menu.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {LoginComponent} from "./components/login/login.component";
import {MovieListComponent} from "./components/movie/movie-list.component";
import {MovieDetailComponent} from "./components/movie/movie-detail.component";
import {RatingComponent} from "./widgets/rating.component";
import {ApplicationService} from "./services/application.service";
import {TranslateService} from "./services/translate.service";
import {MovieService} from "./services/movie.service";
import {CommaSeparatedPipe} from "./pipes/comma-separated.pipe";
import {TranslatePipe} from "./pipes/translate.pipe";
import {ROUTING} from "./app.routes";
import {InputErrorsComponent} from "./widgets/input.errors.component";
import {InputComponent} from "./widgets/input-component.component";
import {GithubService} from "./services/github.service";
import {ChangesComponent} from "./components/changes/changes-component";
import {GithubCommitsComponent} from "./components/changes/github-commits.component";

@NgModule({
    imports: [BrowserModule, HttpModule, ReactiveFormsModule, ROUTING],
    declarations: [
        AppComponent,
        AppMenuComponent,
        LanguageMenuComponent,
        UserMenuComponent,
        WelcomeComponent,
        LoginComponent,
        MovieListComponent,
        MovieDetailComponent,
        ChangesComponent,
        GithubCommitsComponent,
        InputComponent,
        InputErrorsComponent,
        RatingComponent,
        CommaSeparatedPipe,
        TranslatePipe
    ],
    providers: [
        ApplicationService,
        TranslateService,
        MovieService,
        GithubService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

