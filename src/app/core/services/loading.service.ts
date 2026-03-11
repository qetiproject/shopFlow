import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly #loadingSignal = signal<boolean>(false);

  readonly loading = this.#loadingSignal.asReadonly();

  loadingOn(): void {
    this.#loadingSignal.set(true);
  }

  loadingOff(): void {
    this.#loadingSignal.set(false);
  }
}
