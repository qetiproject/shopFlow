import { TestBed } from '@angular/core/testing';
import { MessageSeverity } from '@app-types/message';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('initial state has no message', () => {
    expect(service.message()).toBeNull();
  });

  it('showMessage sets message and clears after duration', () => {
    service.showMessage({
      text: 'Hello',
      severity: MessageSeverity.Info,
    });

    expect(service.message()).toEqual({
      text: 'Hello',
      severity: MessageSeverity.Info,
      position: undefined,
    });

    jest.advanceTimersByTime(3000);

    expect(service.message()).toBeNull();
  });

  it('showMessage uses custom duration', () => {
    service.showMessage({
      text: 'Hi',
      severity: MessageSeverity.Success,
      duration: 5000,
    });

    jest.advanceTimersByTime(3000);
    expect(service.message()).not.toBeNull();

    jest.advanceTimersByTime(2000);
    expect(service.message()).toBeNull();
  });

  it('clear sets message to null', () => {
    service.showMessage({ text: 'X', severity: MessageSeverity.Error });
    expect(service.message()).not.toBeNull();

    service.clear();
    expect(service.message()).toBeNull();
  });

  it('new showMessage cancels previous timer', () => {
    service.showMessage({ text: 'First', severity: MessageSeverity.Info });
    service.showMessage({ text: 'Second', severity: MessageSeverity.Warning });

    jest.advanceTimersByTime(3000);
    expect(service.message()).toBeNull();
  });
});
