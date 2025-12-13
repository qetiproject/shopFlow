import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { selectCheckAuth } from '@auth-module';
import { HeaderComponent, Messages } from "@components";
import { LoadingComponent } from "@features";
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ReactiveFormsModule,
        LoadingComponent,
        HeaderComponent,
        Messages
    ],
    templateUrl: './app.html',
})
export class AppComponent{
    isLoggedIn: boolean = false;
    #store = inject(Store);

    constructor() {
        this.#store.select(selectCheckAuth).subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });
    }

}
