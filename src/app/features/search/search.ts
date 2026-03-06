import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  readonly valueChange = output<string>();

  private readonly searchValue = toSignal(
    this.search.valueChanges.pipe(
      startWith(''),
      map((v) => v.toLowerCase()),
      debounceTime(300),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  constructor() {
    effect(() => {
      this.valueChange.emit(this.searchValue());
    });
  }
}
