import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFacade } from '../../services';
import { Category } from '../../types';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  template: `
    @let categoryList = categoryList$ | async;
    <div>
      @for (category of categoryList; track category.slug) {
        <p>{{ category.name }}</p>
      }
    </div>
  `,
})
export class CategoryComponent {
  #productFacade = inject(ProductFacade);
  categoryList$: Observable<Category[]> = this.#productFacade.getProductCategories();
}
