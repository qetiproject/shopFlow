import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { SortFacade } from './sort.facade';
import { SortOrder } from '@product-module/types/sort';

describe('SortFacade', () => {
  let facade: SortFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SortFacade] });
    facade = TestBed.inject(SortFacade);
  });

  it('is created', () => {
    expect(facade).toBeTruthy();
  });

  it('initial sortOrder is DESC', () => {
    expect(facade.sortOrder()).toBe(SortOrder.DESC);
  });

  it('set updates sortOrder', () => {
    facade.set(SortOrder.ASC);
    expect(facade.sortOrder()).toBe(SortOrder.ASC);

    facade.set(SortOrder.DESC);
    expect(facade.sortOrder()).toBe(SortOrder.DESC);
  });

  it('toggleSort switches ASC to DESC and DESC to ASC', () => {
    expect(facade.sortOrder()).toBe(SortOrder.DESC);

    expect(facade.toggleSort()).toBe(SortOrder.ASC);
    expect(facade.sortOrder()).toBe(SortOrder.ASC);

    expect(facade.toggleSort()).toBe(SortOrder.DESC);
    expect(facade.sortOrder()).toBe(SortOrder.DESC);
  });
});
