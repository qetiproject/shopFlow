import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from '@components';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { AddProductForm, AddProductModel, ProductFacade } from '@product-module';
import { INPUT_TYPES, MessageSeverity } from '@types';
import { FileUploadComponent } from 'app/features/upload-file/upload-file.component';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    SelectComponent,
    FileUploadComponent,
    DynamicValidatorMessage,
  ],
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {
  #productFacade = inject(ProductFacade);
  #messages = inject(MessagesService);
  #fb = inject(NonNullableFormBuilder);

  form = AddProductForm(this.#fb);
  INPUT_TYPES = INPUT_TYPES;
  route = inject(ActivatedRoute);
  router = inject(Router);

  label = signal<string>('Upload Image');
  acceptType = signal<string>('image/*');
  multiple = signal<boolean>(false);

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
    const formValue = this.form.getRawValue();
    const credentials: AddProductModel = {
      ...formValue,
      thumbnail: formValue.thumbnail?.name ?? null,
    };
    this.#productFacade.addProduct(credentials).subscribe({
      next: () => {
        this.#messages.showMessage({
          text: 'Successfully Added',
          severity: MessageSeverity.Success,
        });
        this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent });
      },
    });
  }

  onCancel(): void {
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent });
  }
}
