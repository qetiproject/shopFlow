import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from '@components/select/select';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent } from '@features/custom-form/input/input';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { FileUploadComponent } from '@features/upload-file/upload-file.component';
import { ProductFacade } from '@product-module/services/product.facade';
import { AddProductModel } from '@product-module/types/product';
import { AddProductForm } from '@product-module/utils/add-product-form';
import { INPUT_TYPES } from '../../../../types/input';
import { MessageSeverity } from '../../../../types/message';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
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
      thumbnail: `assets/products/${formValue.thumbnail?.name}`,
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
