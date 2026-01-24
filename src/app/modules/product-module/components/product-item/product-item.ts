import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductViewModel } from '@product-module';
import { CartIcon } from 'app/icons/cart/cart';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CartIcon],
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<ProductViewModel>();

  p = computed(() => {
    const p = this.product();
    return {
      ...p,
      title: p.title.trim(),
      price: p.price,
      description: p.description,
      thumbnail: p.thumbnail,
      discountPercentage: p.discountPercentage,
    };
  });

  originalPrice = computed(() => {
    const p = this.product();
    if (!p.discountPercentage) return null;

    return Math.round(p.price / (1 - p.discountPercentage / 100));
  });
}
