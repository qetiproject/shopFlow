import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-tags',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <section class="flex flex-wrap gap-2" aria-label="Product tags">
    @for (tag of tags(); track tag) {
      <span class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"> #{{ tag }} </span>
    }
  </section>`,
})
export class ProductTags {
  tags = input.required<string[]>();
}
