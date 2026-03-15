import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/services/loading.service';
import { SkipLoading } from '@features/loading/skip-loading.component';
import { of } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let next: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    next = jest.fn().mockReturnValue(of(null));
  });

  it('forwards request to next and returns observable', () => {
    const req = new HttpRequest('GET', '/api/data');
    const handler = (r: HttpRequest<unknown>) => next(r);
    let emitted: unknown = null;

    TestBed.runInInjectionContext(() => {
      LoadingInterceptor(req, handler).subscribe((v) => {
        emitted = v;
      });
    });

    expect(next).toHaveBeenCalledWith(req);
    expect(emitted).toBeNull();
  });

  it('skips loading when request has SkipLoading context', () => {
    const baseReq = new HttpRequest('GET', '/api/data');
    const req = baseReq.clone({
      context: baseReq.context.set(SkipLoading, true),
    });
    const handler = (r: HttpRequest<unknown>) => next(r);
    const loadingService = TestBed.inject(LoadingService);
    const loadingOnSpy = jest.spyOn(loadingService, 'loadingOn');
    const loadingOffSpy = jest.spyOn(loadingService, 'loadingOff');

    TestBed.runInInjectionContext(() => {
      LoadingInterceptor(req, handler).subscribe();
    });

    expect(loadingOnSpy).not.toHaveBeenCalled();
    expect(loadingOffSpy).not.toHaveBeenCalled();
  });
});
