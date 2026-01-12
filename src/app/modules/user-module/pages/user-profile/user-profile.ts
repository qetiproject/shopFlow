import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserViewModel } from '../../types';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.html',
})
export class UserProfile {
  #route = inject(ActivatedRoute)
  userProfile = this.#route.snapshot.data['user'] as UserViewModel;
}
