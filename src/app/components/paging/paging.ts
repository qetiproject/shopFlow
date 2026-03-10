
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paging',
  standalone: true,
  imports: [],
  templateUrl: './paging.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paging {
  totalItems = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input<number>(10);
  windowSize = input<number>(5);
  prevLabel = input<string>('Prev');
  nextLabel = input<string>('Next');
  pageNumber = output<number>();

  /** Total number of pages (0 when there are no items). */
  maxPage = computed(() => {
    const size = Math.max(1, this.pageSize() || 1);
    const total = Math.max(0, this.totalItems() || 0);
    return total === 0 ? 0 : Math.ceil(total / size);
  });

  /** Windowed page numbers to display. */
  visiblePages = computed(() => {
    const max = this.maxPage();
    if (max === 0) return [];

    const windowSize = Math.max(1, this.windowSize() || 1);
    const rawCurrent = this.currentPage() || 1;
    const current = Math.min(Math.max(1, rawCurrent), max);

    const start = Math.floor((current - 1) / windowSize) * windowSize + 1;
    const end = Math.min(start + windowSize - 1, max);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  prevPage(): void {
    const max = this.maxPage();
    if (max === 0) return;

    const current = this.currentPage() || 1;
    const clamped = Math.min(Math.max(1, current), max);
    if (clamped > 1) {
      this.pageNumber.emit(clamped - 1);
    }
  }

  goToPage(page: number) {
    const max = this.maxPage();
    if (max === 0) return;

    const target = Math.min(Math.max(1, page), max);
    this.pageNumber.emit(target);
  }

  nextPage(): void {
    const max = this.maxPage();
    if (max === 0) return;

    const current = this.currentPage() || 1;
    const clamped = Math.min(Math.max(1, current), max);
    if (clamped < max) {
      this.pageNumber.emit(clamped + 1);
    }
  }
}
