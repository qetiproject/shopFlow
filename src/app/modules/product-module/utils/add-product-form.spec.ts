import { NonNullableFormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { AddProductForm } from './add-product-form';

describe('AddProductForm', () => {
  let fb: NonNullableFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    fb = TestBed.inject(NonNullableFormBuilder);
  });

  it('creates form with required controls', () => {
    const form = AddProductForm(fb);

    expect(form.contains('title')).toBe(true);
    expect(form.contains('description')).toBe(true);
    expect(form.contains('category')).toBe(true);
    expect(form.contains('price')).toBe(true);
    expect(form.contains('thumbnail')).toBe(true);
  });

  it('form is invalid when empty', () => {
    const form = AddProductForm(fb);
    expect(form.invalid).toBe(true);
  });

  it('form is valid when all required fields filled including thumbnail', () => {
    const form = AddProductForm(fb);
    form.patchValue({
      title: 'Product',
      description: 'Description',
      category: 'Category',
      price: 10,
      thumbnail: new File([], 'thumb.png'),
    });
    expect(form.valid).toBe(true);
  });

  it('price must be at least 1', () => {
    const form = AddProductForm(fb);
    form.patchValue({
      title: 'P',
      description: 'D',
      category: 'C',
      price: 0,
      thumbnail: null,
    });
    expect(form.get('price')?.hasError('min')).toBe(true);
    expect(form.valid).toBe(false);

    form.patchValue({ price: 1 });
    expect(form.get('price')?.hasError('min')).toBe(false);
  });
});
