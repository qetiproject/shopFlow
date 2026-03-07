import { ChangeDetectionStrategy, Component, Output, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@custom-form/index';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  search = new FormControl<string>('', { nonNullable: true });

  readonly placeholder = input<string>('Search');

  @Output()
  readonly value$ = this.search.valueChanges.pipe(
    startWith(''),
    map((v) => v.toLowerCase()),
    debounceTime(300),
    distinctUntilChanged(),
  );
}
