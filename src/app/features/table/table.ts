import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableColumn } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './table.html',
})
export class Table<T> {
  columns = input.required<TableColumn<T>[]>();
  data = input<T[]>([]);
  trackBy = input<(index: number, item: T) => unknown>((_, item) => item);
}
