import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { selectCheckAuth } from '@auth-module/store/auth.selector';
import { HeaderComponent, Messages } from '@components';
import { LoadingComponent } from '@features';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, LoadingComponent, HeaderComponent, Messages],
  templateUrl: './app.html',
})
export class AppComponent {
  #store = inject(Store);

  readonly isLoggedIn = toSignal(this.#store.select(selectCheckAuth), { initialValue: false });
}
