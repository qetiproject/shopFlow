import { Injectable } from '@angular/core';
import type { BillingDetails } from '@app-types/dto';
import { STORAGE_KEYS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class BillingStorage {
  saveBillingInfo(billingInfo: BillingDetails): void {
    sessionStorage.setItem(STORAGE_KEYS.BILLING, JSON.stringify(billingInfo));
  }

  getBillingInfo(): BillingDetails | null {
    const billing = sessionStorage.getItem(STORAGE_KEYS.BILLING);
    if (!billing) return null;
    try {
      return JSON.parse(billing) as BillingDetails;
    } catch {
      return null;
    }
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.BILLING);
  }
}
