import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductFacade, ProductViewModel } from '@product-module';
import { ConfirmModalService } from 'app/components/confirm-modal/confirm-modal.service';
import { CartIcon } from 'app/icons/cart/cart';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CartIcon],
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<ProductViewModel>();
  productFacade = inject(ProductFacade);
  confirmModal = inject(ConfirmModalService);

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

  async onOpenModal() {
    const { id, title } = this.product();
    const confirmed = await this.confirmModal.open({
      title: 'Delete Product',
      message: `Are you sure you want to delete ${title}?`,
      variant: 'danger',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    });

    if (confirmed) {
      this.productFacade.deleteProduct(id).subscribe({
        next: () => console.log('Product deleted'),
        error: () => console.log('Error deleting product'),
      });
    }
  }
}
