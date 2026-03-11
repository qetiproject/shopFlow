import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@auth-module/services/token.service';
import { PROTECTED_ENDPOINTS } from '@core/constants';

export const AuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);
  const needsAuth = PROTECTED_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));
  const accessToken = tokenService.getToken();
  const authReq =
    needsAuth && accessToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
      : req;
  return next(authReq);
};
