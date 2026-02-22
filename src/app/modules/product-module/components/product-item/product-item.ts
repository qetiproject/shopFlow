import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmModalService } from '@features';
import { ProductFacade, ProductViewModel } from '@product-module';
import { CartIcon } from 'app/icons/cart/cart';
import { CartStore } from 'app/modules/cart-module/store/cart.store';
import { AddToCartRequest } from 'app/modules/cart-module/types/cart.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CartIcon],
  templateUrl: './product-item.html',
  providers: [CartStore],
})
export class ProductItem {
  product = input.required<ProductViewModel>();
  productFacade = inject(ProductFacade);
  confirmModal = inject(ConfirmModalService);
  store = inject(CartStore);
  router = inject(Router);

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
    const newProduct: AddToCartRequest = {
      id: product.id,
      product: {
        ...product,
        quantity: 1,
        total: product.price * 1,
        discountedTotal: product.price * 1 - (product.price * product.discountPercentage) / 100,
      },
      total: product.price * 1,
      totalProducts: 1,
    };
    this.store.addCProductToCart(newProduct);
    this.router.navigate(['/cart']);

    console.log(newProduct, 'added to cart');
  }
}
