import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { Product } from '@product-module/types/product';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [],
  templateUrl: './product-images.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
