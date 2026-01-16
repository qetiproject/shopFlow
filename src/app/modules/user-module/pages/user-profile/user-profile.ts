import { Component, inject } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.html',
})
export class UserProfile {
  #route = inject(ActivatedRoute)
  userProfile = toSignal(
    this.#route.data.pipe(map((d) => d['user'])),
    { initialValue: null }
  );
  
}
