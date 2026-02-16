import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModal } from '@components';
import { ProductFacade, ProductViewModel } from '@product-module';
import { CartIcon } from 'app/icons/cart/cart';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CartIcon, ConfirmModal],
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<ProductViewModel>();
  productFacade = inject(ProductFacade);

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

  showModal = signal(false);
  modalTitle = signal('Delete Product');
  modalMessage = computed(() => {
    const product = this.product();
    return `Do you really want to delete ${product.title}?`;
  });

  onConfirmed() {
    const { id } = this.product();
    this.productFacade.deleteProduct(id).subscribe({
      next: () => {
        this.showModal.set(false);
      },
      error: () => {
        this.showModal.set(false);
      },
    });
  }

  onCanceled() {
    console.log('Canceled via signal!');
  }
}
