import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, setupComponent } from '../../../../utils';
import { mockLoginRequest } from '../../../../utils/mock-data';
import * as AuthActions from '../../store/auth.actions';
import { Login } from '../login/login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let store: jest.Mocked<Pick<Store, 'dispatch'>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const setup = setupComponent(Login);
    fixture = setup.fixture;
    component = setup.instance as Login;

    store = TestBed.inject(Store) as unknown as jest.Mocked<Pick<Store, 'dispatch'>>;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the Login title', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('[data-testid="LoginTitle"]');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Login');
  });

  it('form is invalid when empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('submit button is disabled when form is invalid', () => {
    const el: HTMLElement = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="LoginSubmit"]') as HTMLButtonElement;
    expect(component.form.invalid).toBe(true);
    expect(submit?.disabled).toBe(true);
  });

  it('submit button is enabled when form is valid', () => {
    component.form.setValue(mockLoginRequest);
    fixture.detectChanges();

    const el = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="LoginSubmit"]') as HTMLButtonElement;
    expect(component.form.valid).toBe(true);
    expect(submit?.disabled).toBe(false);
  });

  it('dispatches loginUser with credentials on submit', () => {
    component.form.setValue(mockLoginRequest);
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.loginUser({ payload: mockLoginRequest }),
    );
  });

  it('has email and password controls', () => {
    expect(component.form.contains('emailId')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
  });
});
