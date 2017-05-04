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
import {MessagesService} from "./services/messages.service";
import {MessagesMenuComponent} from "./menu/messages-menu.component";
import {LimitPipe} from "./pipes/limit.pipe";
import {DatePipe} from "./pipes/date.pipe";
import {TimePipe} from "./pipes/time.pipe";
import {DateTimePipe} from "./pipes/date-time.pipe";
import {SaveURLPipe} from "./pipes/save-url.pipe";
import {GoogleAuthService} from "./services/google-auth.service";
import {GoogleCalendarService} from "./services/google-calendar.service";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {LoginService} from "./services/login.service";

@NgModule({
    imports: [BrowserModule, HttpModule, ReactiveFormsModule, ROUTING],
    declarations: [
        AppComponent,
        AppMenuComponent,
        LanguageMenuComponent,
        UserMenuComponent,
        MessagesMenuComponent,
        WelcomeComponent,
        LoginComponent,
        MovieListComponent,
        MovieDetailComponent,
        ChangesComponent,
        GithubCommitsComponent,
        CalendarComponent,
        InputComponent,
        InputErrorsComponent,
        RatingComponent,
        DatePipe,
        TimePipe,
        DateTimePipe,
        CommaSeparatedPipe,
        LimitPipe,
        TranslatePipe,
        SaveURLPipe
    ],
    providers: [
        ApplicationService,
        MessagesService,
        TranslateService,
        MovieService,
        GithubService,
        GoogleAuthService,
        GoogleCalendarService,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

