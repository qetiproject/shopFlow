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
        map(v => v?.trim() || ''),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(v => this.searchValue.emit(v))
  }
}
