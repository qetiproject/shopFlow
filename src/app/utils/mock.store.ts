import { Store } from "@ngrx/store";

export function provideMockStore() {
  return {
    provide: Store,
    useValue: {
      dispatch: jest.fn(),
      select: jest.fn(),
    },
  };
}