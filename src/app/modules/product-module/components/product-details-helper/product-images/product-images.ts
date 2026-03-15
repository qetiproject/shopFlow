import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { Product } from '@app-types/dto';

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

  selectImage(img: string): void {
    this.mainImage.set(img);
  }
}
