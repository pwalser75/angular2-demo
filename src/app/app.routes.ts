import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'movies',
        component: MovieListComponent
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES,  {useHash: true});

