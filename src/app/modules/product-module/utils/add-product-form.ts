import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

export interface AddProductForm {
  title: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number | null>;
  thumbnail: FormControl<File | null>;
}

export function AddProductForm(fb: NonNullableFormBuilder) {
  return fb.group<AddProductForm>({
    title: fb.control('', [Validators.required]),
    description: fb.control('', [Validators.required]),
    category: fb.control('', [Validators.required]),
    price: fb.control(null, [Validators.required, Validators.min(1)]),
    thumbnail: fb.control(null, [Validators.required]),
  });
}
