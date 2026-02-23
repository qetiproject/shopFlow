import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartFacade, CartStore } from '@cart-module';
import { MessagesService } from '@core';
import { ConfirmModalService } from '@features';
import { ProductFacade, ProductViewModel } from '@product-module';
import { MessageSeverity } from '@types';
import { RemoveSVG } from 'app/icons';
import { CartIcon } from 'app/icons/cart/cart';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CartIcon, RemoveSVG],
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<ProductViewModel>();
  productFacade = inject(ProductFacade);
  confirmModal = inject(ConfirmModalService);
  store = inject(CartStore);
  router = inject(Router);
  #cartFacade = inject(CartFacade);
  #messages = inject(MessagesService);

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

  addToCart(product: ProductViewModel) {
    const success = this.#cartFacade.addProductInCart(product, 1);

    if (success) {
      this.#messages.showMessage({
        text: 'Product added successfully into the cart',
        severity: MessageSeverity.Success,
      });
    }
  }
}
