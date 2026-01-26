import { Component } from '@angular/core';
import { ProductList } from '@product-module';
import { ProductHeader } from '../../components/product-header/product-header';

@Component({
  selector: 'products',
  standalone: true,
  imports: [ProductList, ProductHeader],
  templateUrl: './products.html',
})
export class ProductsPage {}
