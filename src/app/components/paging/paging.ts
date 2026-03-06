
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paging',
  standalone: true,
  imports: [],
  templateUrl: './paging.html',
})
export class Paging {
  totalItems = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input<number>(10);
  windowSize = input<number>(5);
  pageNumber = output<number>();

  maxPage = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  visiblePages = computed(() => {
    const max = this.maxPage();
    const current = this.currentPage();

    const start = Math.floor((current - 1) / this.windowSize()) * this.windowSize() + 1;
    const end = Math.min(start + this.windowSize() - 1, max);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  prevPage(): void {
    const current = this.currentPage();
    if (current > 1) {
      this.pageNumber.emit(this.currentPage() - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.maxPage()) {
      this.pageNumber.emit(page);
    }
  }

  nextPage(): void {
    const current = this.currentPage();
    if (current < this.maxPage()) {
      this.pageNumber.emit(this.currentPage() + 1);
    }
  }
}
