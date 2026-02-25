import { Component, computed, inject, signal } from '@angular/core';
import { Paging } from '@components';
import { Table } from '@features';
import { TableColumn } from '@types';
import { formatCreatedDate } from '@utils';
import { OrderStorage } from '../../services';
import { Order } from '../../types';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [Table, Paging],
  templateUrl: './orders.html',
})
export class Orders {
  #orderStorage = inject(OrderStorage);
  orders = this.#orderStorage.getOrders();
  pageNumber = signal<number>(1);
  pageSize = signal<number>(2);
  windowSize = signal<number>(5);

  trackByOrder = (_: number, order: Order) => order.id;

  columns = computed<TableColumn<Order>[]>(() => {
    return [
      { key: 'id', label: 'id', cell: (o) => o.id },
      {
        key: 'createdAt',
        label: 'Created',
        cell: (o) => formatCreatedDate(o.createdAt),
      },
      { key: 'total', label: 'total', cell: (o) => o.total.toFixed(2) },
      { key: 'status', label: 'status', cell: (o) => o.status },
      {
        key: 'fullName',
        label: 'Full Name',
        cell: (o) => `${o.billing.firstName} ${o.billing.lastName}`,
      },
      {
        key: 'address',
        label: 'Address',
        cell: (o) => `${o.billing.address}, ${o.billing.city}`,
      },
    ];
  });

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }
}
