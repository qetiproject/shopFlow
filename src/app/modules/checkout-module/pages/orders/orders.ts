import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { Order, OrderStorage } from '@checkout-module';
import { Paging } from '@components';
import { Table } from '@features';
import { TableColumn } from '@types';
import { formatCreatedDate } from '@utils';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [Paging, Table, CurrencyPipe],
  templateUrl: './orders.html',
})
export class Orders {
  #orderStorage = inject(OrderStorage);
  orders = this.#orderStorage.getOrders();
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);

  totalCell = viewChild<TemplateRef<{ $implicit: Order }>>('totalCell');

  trackByOrder = (_: number, order: Order) => order.id;

  columns = computed<TableColumn<Order>[]>(() => {
    const totalCell = this.totalCell();

    if (!totalCell) return [];

    return [
      { key: 'id', label: '#', cell: (o) => o.id },
      {
        key: 'createdAt',
        label: 'Created',
        cell: (o) => formatCreatedDate(o.createdAt),
      },
      { key: 'total', label: 'Total', template: totalCell },
      { key: 'status', label: 'Status', cell: (o) => o.status },
      {
        key: 'fullName',
        label: 'Full Name',
        cell: (o) => o.billing.fullName,
      },
      {
        key: 'address',
        label: 'Address',
        cell: (o) => o.billing.fullAddress,
      },
    ];
  });

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }

  get pagedOrders(): Order[] {
    const start = (this.pageNumber() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.orders.order.slice(start, end);
  }
}
