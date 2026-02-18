import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@components';
import { ProductFacade } from '@product-module';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, SelectComponent, ReactiveFormsModule],
  template: ` <app-select [options]="categoryOptions()" [formControl]="control"></app-select> `,
})
export class CategoryComponent {
  #productFacade = inject(ProductFacade);
  categorySelected = output<string>();
  control = new FormControl<string>('', { nonNullable: true });

  categoryList = toSignal(this.#productFacade.getProductCategories(), {
    initialValue: [],
  });

  categoryOptions = computed(() => [
    { label: 'All Categories', value: '' },
    ...this.categoryList().map((c) => ({
      label: c.name,
      value: c.slug,
    })),
  ]);

  categoryValue = toSignal(this.control.valueChanges, {
    initialValue: '',
  });

  constructor() {
    effect(() => {
      this.categorySelected.emit(this.categoryValue());
    });
  }
}
