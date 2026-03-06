import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile {
  #route = inject(ActivatedRoute);
  userProfile = toSignal(this.#route.data.pipe(map((d) => d['user'])), { initialValue: null });

  readonly initials = computed(() => {
    const fullName = this.userProfile().fullName || '';
    const info = fullName.trim().split(' ');
    const firstLetters = info.map((name: string) => name[0].toUpperCase());
    return firstLetters.slice(0, 2).join('');
  });
}
