import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '@core/constants';
import { Order, OrderList } from '@checkout-module/types/order';

@Injectable({
  providedIn: 'root',
})
export class OrderStorage {
  saveOrder(order: Order) {
    const existing = this.getOrders() || { order: [], totalRecords: 0 };

    existing.order.push(order);

    const toSave: OrderList = {
      order: existing.order,
      totalRecords: existing.order.length,
    };

    localStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(toSave));
  }

  getOrders(): OrderList {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDER);
    if (!raw) return { order: [], totalRecords: 0 };

    try {
      const parsed: OrderList = JSON.parse(raw);
      return parsed.order ? parsed : { order: [], totalRecords: 0 };
    } catch {
      return { order: [], totalRecords: 0 };
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.ORDER);
  }

  getTotalRecords(): number {
    return this.getOrders().totalRecords;
  }
}
