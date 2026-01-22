import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductViewModel } from '@product-module';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<ProductViewModel>();
}
