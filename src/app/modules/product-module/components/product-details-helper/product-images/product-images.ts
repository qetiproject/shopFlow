import { Component, effect, input, signal } from '@angular/core';
import { Product } from '@product-module';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [],
  templateUrl: './product-images.html',
})
export class ProductImages {
  product = input.required<Product>();

  mainImage = signal<string>('');

  constructor() {
    effect(() => {
      this.mainImage.set(this.product().thumbnail);
    });
  }

  selectImage(img: string) {
    this.mainImage.set(img);
  }
}
