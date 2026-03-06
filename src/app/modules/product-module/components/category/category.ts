
import { Component, computed, effect, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@components/select/select';
import { ProductFacade } from '@product-module/services/product.facade';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template: ` <app-select [options]="categoryOptions()" [formControl]="control" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
