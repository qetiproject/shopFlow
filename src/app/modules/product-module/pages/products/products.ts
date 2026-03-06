import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from '@product-module/components/product-list/product-list';
import { ProducsPagetHeader } from '@product-module/components/products-page-header/products-page-header';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList, RouterOutlet, ProducsPagetHeader],
  templateUrl: './products.html',
})
export class ProductsPage {}
