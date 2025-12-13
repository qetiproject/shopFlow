import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "@auth-module";

export const AuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);

  const protectedEndpoints = ['/auth/me'];
  const needsAuth = protectedEndpoints.some(endpoint => req.url.includes(endpoint));

  const accessToken = tokenService.getToken();
  const authReq = needsAuth && accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq);
};
