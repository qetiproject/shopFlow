import { Component } from '@angular/core';
import { ProductHeader, ProductList } from '@product-module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList, ProductHeader],
  templateUrl: './products.html',
})
export class ProductsPage {}
