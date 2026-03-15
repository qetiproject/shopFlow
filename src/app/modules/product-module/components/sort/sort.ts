import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { SortFacade } from '@product-module/services/sort.facade';
import { SortOrder } from '@product-module/types/sort';
import { SortSVG } from 'assets/icons/sort';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [SortSVG],
  templateUrl: './sort.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  #sortFacade = inject(SortFacade);
  sortedVale = output<SortOrder>();

  protected readonly sortOrder = this.#sortFacade.sortOrder;

  toggleSort(): void {
    const order = this.#sortFacade.toggleSort();
    this.sortedVale.emit(order);
  }

  get sortIconPath(): string {
    return this.sortOrder() === SortOrder.ASC
      ? 'M5 1v12m0 0 4-4m-4 4L1 9'
      : 'M5 13V1m0 0L1 5m4-4 4 4';
  }
}
