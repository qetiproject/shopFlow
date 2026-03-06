import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessagesService, toErrorMessage } from '@core';
import { MessageSeverity } from '@types';
import { catchError, throwError } from 'rxjs';

export const GlobalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messages = inject(MessagesService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0 || error.status >= 400) {
        messages.showMessage({
          text: toErrorMessage(error),
          severity: MessageSeverity.Error,
          duration: 5000,
        });
      }
      return throwError(() => error);
    }),
  );
};