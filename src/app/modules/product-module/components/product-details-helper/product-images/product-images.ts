import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
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

  readonly picked = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.product();
      this.picked.set(null);
    });
  }

  readonly mainUrl = computed(() => {
    const p = this.product();
    return (this.picked() ?? p.thumbnail) || p.images?.[0] || '';
  });

  selectImage(img: string): void {
    this.picked.set(img);
  }
}
