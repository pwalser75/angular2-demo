import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    // Using backticks allows multi-line templates.
    // This is long enough to be in a separate file,
    // but is inline as an example.
    templateUrl: 'templates/application.html'
})
export class AppComponent {
    public isTestable: boolean = true;

    // Angular 2 uses a tree of components to create an app.
    // This component is the root node of that tree.
}

