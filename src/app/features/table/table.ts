import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableColumn } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './table.html',
})
export class Table<T> {
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input({ required: true }) data: T[] = [];
  @Input() trackBy: (index: number, item: T) => any = (_, item) => item;
}
