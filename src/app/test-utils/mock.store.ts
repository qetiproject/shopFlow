import { Store } from "@ngrx/store";

export function provideMockStore() {
    return {
        provide: Store,
        useValue: jasmine.createSpyObj('Store', ['dispatch', 'select'])
    }
}