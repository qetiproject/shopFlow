import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsPageHeader } from '@product-module/components/products-page-header/products-page-header';
import { ProductList } from '@product-module/components/product-list/product-list';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList, RouterOutlet, ProductsPageHeader],
  templateUrl: './products.html',
})
export class ProductsPage {}
