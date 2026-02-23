import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProducsPagetHeader, ProductList } from '@product-module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductList, ProducsPagetHeader, RouterOutlet],
  templateUrl: './products.html',
})
export class ProductsPage {}
