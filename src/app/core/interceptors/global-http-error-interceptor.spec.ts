import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MessageSeverity } from '@app-types/message';
import { MessagesService } from '@core/services/messages.service';
import { of, throwError } from 'rxjs';
import { GlobalHttpErrorInterceptor } from './global-http-error-interceptor';

describe('GlobalHttpErrorInterceptor', () => {
  let messagesService: jest.Mocked<Pick<MessagesService, 'showMessage'>>;
  let next: jest.Mock;

  beforeEach(() => {
    messagesService = { showMessage: jest.fn() };
    next = jest.fn();

    TestBed.configureTestingModule({
      providers: [{ provide: MessagesService, useValue: messagesService }],
    });
  });

  it('shows error message and rethrows when status is 400', (done) => {
    const error = new HttpErrorResponse({ status: 400, error: 'Bad request' });
    next.mockReturnValue(throwError(() => error));

    const req = new HttpRequest('GET', '/api/data');
    const handler = (r: HttpRequest<unknown>) => next(r);

    TestBed.runInInjectionContext(() => {
      GlobalHttpErrorInterceptor(req, handler).subscribe({
        error: (err) => {
          expect(messagesService.showMessage).toHaveBeenCalledWith({
            text: expect.any(String),
            severity: MessageSeverity.Error,
            duration: 5000,
          });
          expect(err).toBe(error);
          done();
        },
      });
    });
  });

  it('shows error message when status is 0', (done) => {
    const error = new HttpErrorResponse({ status: 0 });
    next.mockReturnValue(throwError(() => error));

    const req = new HttpRequest('GET', '/api/data');
    const handler = (r: HttpRequest<unknown>) => next(r);

    TestBed.runInInjectionContext(() => {
      GlobalHttpErrorInterceptor(req, handler).subscribe({
        error: () => {
          expect(messagesService.showMessage).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  it('does not show message for success response', () => {
    next.mockReturnValue(of({ body: 'ok' }));

    const req = new HttpRequest('GET', '/api/data');
    const handler = (r: HttpRequest<unknown>) => next(r);

    TestBed.runInInjectionContext(() => {
      GlobalHttpErrorInterceptor(req, handler).subscribe();
    });

    expect(messagesService.showMessage).not.toHaveBeenCalled();
  });
});
