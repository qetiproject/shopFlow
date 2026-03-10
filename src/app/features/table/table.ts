import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableColumn, TableId } from '@app-types/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T extends TableId> {
  columns = input.required<TableColumn<T>[]>();
  data = input<T[]>([]);

  trackBy = input<(index: number, item: T) => string | number>((_, item) => {
    if (item.id != null) return item.id;
    if (item.userId != null) return item.userId;
    return _;
  });

  getCell<K extends keyof T>(row: T, key: K): T[K] {
    return row[key];
  }
}
