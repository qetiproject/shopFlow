import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "@custom-form/index";
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'search',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './search.html',
})
export class Search {
  search = new FormControl<string>('');
  @Output() searchValue = new EventEmitter<string>();

  constructor() {
    this.search.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(300),
        map(v => v?.trim().toLowerCase() || ''),
      ).subscribe(v => this.searchValue.emit(v))
  }
}
