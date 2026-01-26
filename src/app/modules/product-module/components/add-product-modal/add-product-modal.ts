import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { ProductFacade } from '../../services';
import { AddProductModel } from '../../types';
import { AddProductForm } from '../../utils/add-product-form';

@Component({
  selector: 'add-product-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {
  #productFacade = inject(ProductFacade);
  #fb = inject(NonNullableFormBuilder);
  form = AddProductForm(this.#fb);
  INPUT_TYPES = INPUT_TYPES;
  route = inject(ActivatedRoute);

  onSubmit(): void {
    if (this.form.invalid) return;
    const credentials: AddProductModel = this.form.getRawValue() as AddProductModel;
    this.#productFacade.addProduct(credentials);
  }

  onCancel(): void {}
}
