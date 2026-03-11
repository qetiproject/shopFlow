import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { selectCheckAuth } from '@auth-module/store/auth.selector';
import { HeaderComponent } from '@components/header/header';
import { MessagesComponent } from '@components/messages/messages';
import { LoadingComponent } from '@features/loading/loading.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, LoadingComponent, HeaderComponent, MessagesComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  #store = inject(Store);

  readonly isLoggedIn = toSignal(this.#store.select(selectCheckAuth), { initialValue: false });
}
