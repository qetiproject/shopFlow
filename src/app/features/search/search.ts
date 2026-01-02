import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "@custom-form/index";
import { debounceTime, distinctUntilChanged, map, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'search',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './search.html',
})
export class Search implements OnDestroy{
  search = new FormControl<string>('');
  @Output() searchValue = new EventEmitter<string>();
  #destroy$ = new Subject<void>();

  constructor() {
    this.search.valueChanges
      .pipe(
        startWith(''),
        map(v => v?.toLowerCase()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.#destroy$)
      ).subscribe(v => this.searchValue.emit(v))
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
