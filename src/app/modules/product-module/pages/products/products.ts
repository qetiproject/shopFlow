import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductHeader, ProductList } from '@product-module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList, ProductHeader, RouterOutlet],
  templateUrl: './products.html',
})
export class ProductsPage {}
