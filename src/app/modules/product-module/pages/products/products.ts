import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from '@product-module';
import { ProductHeader } from '../../components/product-header/product-header';

@Component({
  selector: 'products',
  standalone: true,
  imports: [ProductList, ProductHeader, RouterOutlet],
  templateUrl: './products.html',
})
export class ProductsPage {}
