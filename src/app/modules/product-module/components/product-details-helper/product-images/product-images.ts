import { Component, input } from '@angular/core';
import { Product } from '@product-module';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [],
  templateUrl: './product-images.html',
})
export class ProductImages {
  product = input.required<Product>();
}
