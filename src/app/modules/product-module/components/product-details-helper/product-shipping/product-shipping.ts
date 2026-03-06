import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-shipping',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <section
    class="space-y-1 text-sm text-gray-600 mb-8"
    aria-label="Shipping and warranty information"
  >
    <p>🚚 {{ shippingInfo() }}</p>
    <p>🛡 {{ warrantyInfo() }}</p>
  </section>`,
})
export class ProductShipping {
  shippingInfo = input.required<string>();
  warrantyInfo = input.required<string>();
}
