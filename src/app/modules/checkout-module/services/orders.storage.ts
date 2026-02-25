import { Injectable } from '@angular/core';
import { Order } from '@checkout-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class OrderStorage {
  saveOrder(order: Order) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDER) || '[]');
    existing.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(existing));
  }

  getOrder(): Order | null {
    const order = localStorage.getItem(STORAGE_KEYS.ORDER);
    return order ? JSON.parse(order) : null;
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.ORDER);
  }
}
