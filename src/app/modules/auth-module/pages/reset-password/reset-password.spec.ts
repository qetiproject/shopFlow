import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { setupComponent } from '@utils/setup-component-testing';
import { ResetPassword } from '..';

describe('ResetPassword', () => {
  let component: ResetPassword;
  let fixture: ComponentFixture<ResetPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const setup = setupComponent(ResetPassword);
    fixture = setup.fixture;
    component = setup.instance;
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid initially', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('submit button is disabled when form is invalid', () => {
    fixture.detectChanges();

    const el = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="submit"]') as HTMLButtonElement;

    expect(component.form.invalid).toBe(true);
    expect(submit.disabled).toBe(true);
  });

  it('submit button is enabled when form is valid', () => {
    const credentials = {
      email: 'keti@gmail.com',
      otp: '123456',
      newPassword: '12345678',
    };

    component.form.patchValue(credentials);
    fixture.detectChanges();

    const el = fixture.nativeElement;
    const submit = el.querySelector('[data-testid="submit"]') as HTMLButtonElement;

    expect(component.form.valid).toBe(true);
    expect(submit.disabled).toBe(false);
  });
});
