import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@components';
import { ProductFacade } from '@product-module';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, SelectComponent, ReactiveFormsModule],
  template: `
    <app-select [options]="categoryOptions()" [label]="label" [formControl]="category"></app-select>
  `,
})
export class CategoryComponent {
  #productFacade = inject(ProductFacade);
  label: string = 'Choose Category';
  categorySelected = output<string | null>();
  category = new FormControl<string | null>(null);

  categoryList = toSignal(this.#productFacade.getProductCategories(), {
    initialValue: [],
  });

  categoryOptions = computed(() =>
    this.categoryList().map((c) => ({
      label: c.name,
      value: c.slug,
    })),
  );

  categoryValue = toSignal(this.category.valueChanges, {
    initialValue: null,
  });

  constructor() {
    effect(() => {
      this.categorySelected.emit(this.categoryValue());
    });
  }
}
