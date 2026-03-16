import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TokenService } from '@auth-module/services/token.service';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let tokenService: jest.Mocked<Pick<TokenService, 'getToken'>>;
  let next: jest.Mock;

  beforeEach(() => {
    tokenService = { getToken: jest.fn() };
    next = jest.fn().mockReturnValue(of(null));

    TestBed.configureTestingModule({
      providers: [{ provide: TokenService, useValue: tokenService }],
    });
  });

  it('adds Authorization header when URL matches protected endpoint and token exists', () => {
    (tokenService.getToken as jest.Mock).mockReturnValue('jwt123');

    const req = new HttpRequest('GET', 'https://api.example/auth/me');
    const handler: HttpHandlerFn = (r) => next(r);
    TestBed.runInInjectionContext(() => {
      AuthInterceptor(req, handler).subscribe();
    });

    expect(next).toHaveBeenCalledTimes(1);
    const passedReq = next.mock.calls[0][0] as HttpRequest<unknown>;
    expect(passedReq.headers.get('Authorization')).toBe('Bearer jwt123');
  });

  it('does not add header when URL does not match protected endpoint', () => {
    (tokenService.getToken as jest.Mock).mockReturnValue('jwt123');

    const req = new HttpRequest('GET', 'https://api.example/public/data');
    const handler: HttpHandlerFn = (r) => next(r);
    TestBed.runInInjectionContext(() => {
      AuthInterceptor(req, handler).subscribe();
    });

    expect(next).toHaveBeenCalledWith(req);
    const passedReq = next.mock.calls[0][0] as HttpRequest<unknown>;
    expect(passedReq.headers.has('Authorization')).toBe(false);
  });

  it('does not add header when token is null', () => {
    (tokenService.getToken as jest.Mock).mockReturnValue(null);

    const req = new HttpRequest('GET', 'https://api.example/auth/me');
    const handler: HttpHandlerFn = (r) => next(r);
    TestBed.runInInjectionContext(() => {
      AuthInterceptor(req, handler).subscribe();
    });

    expect(next).toHaveBeenCalledWith(req);
    const passedReq = next.mock.calls[0][0] as HttpRequest<unknown>;
    expect(passedReq.headers.has('Authorization')).toBe(false);
  });
});
