import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@utils/mock.store';
import { setupComponent } from '@utils/setup-component-testing';
import * as AuthActions from '../../store/auth.actions';
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let store: jest.Mocked<Pick<Store, 'dispatch'>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([]), provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const setup = setupComponent(Register);
    fixture = setup.fixture;
    component = setup.instance as Register;

    store = TestBed.inject(Store) as unknown as jest.Mocked<Pick<Store, 'dispatch'>>;
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the Register title', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('[data-testid="RegisterTitle"]');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Register');
  });

  it('form is invalid when empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('submit button should be disabled when form is invalid', () => {
    const el: HTMLElement = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="RegisterSubmit"]') as HTMLButtonElement;
    expect(component.form.invalid).toBe(true);
    expect(submit.disabled).toBe(true);
  });

  it('submit button should be enabled when form is valid', () => {
    const credentials = {
      emailId: 'test@mail.com',
      fullName: 'keti Khetsuriani',
      password: '12345678',
    };

    component.form.setValue(credentials);
    fixture.detectChanges();

    const el = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="RegisterSubmit"]') as HTMLButtonElement;
    expect(component.form.valid).toBe(true);
    expect(submit?.disabled).toBe(false);
  });

  it('should dispatch registerUser action with correct payload on submit', () => {
    const credentials = {
      emailId: 'test23@mail.com',
      password: '12345678',
      fullName: 'keti',
    };

    component.form.setValue(credentials);
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.registerUser({
        payload: credentials,
      }),
    );
  });

  it('has all controls', () => {
    expect(component.form.contains('emailId')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
    expect(component.form.contains('fullName')).toBe(true);
  });
});
