import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('initial loading state is false', () => {
    expect(service.loading()).toBe(false);
  });

  it('loadingOn sets loading to true', () => {
    service.loadingOn();
    expect(service.loading()).toBe(true);
  });

  it('loadingOff sets loading to false', () => {
    service.loadingOn();
    service.loadingOff();
    expect(service.loading()).toBe(false);
  });
});
