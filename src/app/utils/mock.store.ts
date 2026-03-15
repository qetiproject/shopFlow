import { Provider } from '@angular/core';
import { Store } from '@ngrx/store';

export interface MockStore {
  dispatch: jest.Mock;
  select: jest.Mock;
}

function createMockStore(): MockStore {
  return {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
}

export function provideMockStore(): Provider {
  return {
    provide: Store,
    useValue: createMockStore(),
  };
}
