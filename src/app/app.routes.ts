import {Routes, RouterModule} from "@angular/router";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {MovieListComponent} from "./components/movie/movie-list.component";
import {MovieDetailComponent} from "./components/movie/movie-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {ChangesComponent} from "./components/changes/changes-component";
import {CalendarComponent} from "./components/calendar/calendar.component";

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full',
        data: {title: 'Angular2 Demo'}
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
        data: {title: 'Angular2 Demo | Welcome'}
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {title: 'Angular2 Demo | Login'}
    },
    {
        path: 'movies',
        component: MovieListComponent,
        data: {title: 'Angular2 Demo | Movies'}
    },
    {
        path: 'movie/:id',
        component: MovieDetailComponent,
        data: {title: 'Angular2 Demo | Movie Detail'}
    },
    {
        path: 'changes',
        component: ChangesComponent,
        data: {title: 'Angular2 Demo | Changes'}
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        data: {title: 'Angular2 Demo | Calendar'}
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES, {useHash: true});

