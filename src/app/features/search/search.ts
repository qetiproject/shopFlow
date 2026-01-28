import { Component, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@custom-form/index';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './search.html',
})
export class Search {
  search = new FormControl<string>('', { nonNullable: true });

  @Input() placeholder = 'Search';

  @Output()
  readonly value$ = this.search.valueChanges.pipe(
    startWith(''),
    map((v) => v.toLowerCase()),
    debounceTime(300),
    distinctUntilChanged(),
  );
}
