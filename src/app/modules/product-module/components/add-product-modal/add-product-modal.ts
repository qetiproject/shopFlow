import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectComponent } from '@components';
import { InputComponent } from '@features';
import { AddProductForm, AddProductModel, ProductFacade } from '@product-module';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule, SelectComponent],
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {
  #productFacade = inject(ProductFacade);
  #fb = inject(NonNullableFormBuilder);
  form = AddProductForm(this.#fb);
  INPUT_TYPES = INPUT_TYPES;
  route = inject(ActivatedRoute);

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

  onSubmit(): void {
    if (this.form.invalid) return;
    const credentials: AddProductModel = this.form.getRawValue() as AddProductModel;
    this.#productFacade.addProduct(credentials);
  }
}
