import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  router = inject(ActivatedRoute);
  constructor() {
    const id = this.router.paramMap;
    console.log(id, 'id');
  }
}
