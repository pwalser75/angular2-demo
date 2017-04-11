import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const ROUTES: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES);

