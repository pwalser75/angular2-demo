import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppMenuComponent} from "./menu/app-menu.component";
import {UserMenuComponent} from "./menu/user-menu.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {MovieListComponent} from "./components/movie/movie-list.component";
import {MovieDetailComponent} from "./components/movie/movie-detail.component";
import {RatingComponent} from "./widgets/rating.component";
import {CommaSeparatedPipe} from "./pipes/comma-separated.pipe";
import {ApplicationService} from "./services/application.service";
import {MovieService} from "./services/movie.service";
import {ROUTING} from "./app.routes";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
    imports: [BrowserModule, ROUTING],
    declarations: [
        AppComponent,
        AppMenuComponent,
        UserMenuComponent,
        WelcomeComponent,
        LoginComponent,
        MovieListComponent,
        MovieDetailComponent,
        RatingComponent,
        CommaSeparatedPipe
    ],
    providers: [
        ApplicationService,
        MovieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

