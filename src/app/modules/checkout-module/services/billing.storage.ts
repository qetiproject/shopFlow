import { Injectable } from '@angular/core';
import { BillingDetails } from '@checkout-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class BillingStorage {
  savebillingInfo(billingInfo: BillingDetails) {
    sessionStorage.setItem(STORAGE_KEYS.BILLING, JSON.stringify(billingInfo));
  }

  getBillingInfo(): BillingDetails | null {
    const billing = sessionStorage.getItem(STORAGE_KEYS.BILLING);
    return billing ? JSON.parse(billing) : null;
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.BILLING);
  }
}
