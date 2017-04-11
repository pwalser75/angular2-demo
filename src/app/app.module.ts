import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';

import { AboutComponent } from './components/about/about.component';

import { RatingComponent } from './widgets/rating.component';

import { ROUTING } from './app.routes';

@NgModule({
    imports: [ BrowserModule, ROUTING ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        MenuComponent,
        AboutComponent,
		RatingComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

