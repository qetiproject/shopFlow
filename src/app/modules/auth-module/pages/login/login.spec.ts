import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import * as AuthActions from '@auth-module';
import { Login } from "@auth-module";
import { Store } from "@ngrx/store";

describe('Login ', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Login],
            providers: [
                provideRouter([]),
                {
                    provide: Store,
                    useValue: jasmine.createSpyObj('Store', ['dispatch'])
                },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates a component', () => {
        expect(component).toBeTruthy();
    });

    it('should render Login header', () => {
        const el: HTMLElement = fixture.nativeElement;
        const title = el.querySelector('[data-testid="LoginHeader"]');
        expect(title).toBeTruthy();
    });

    it('form should be invalid initially', () => {
        expect(component.form.invalid).toBeTrue()
    });

    it('submit button should be disabled when form is invalid', () => {
        const el: HTMLElement = fixture.nativeElement;
        const submit = el.querySelector('[data-testid="LoginSubmit"]') as HTMLButtonElement;
        expect(component.form.invalid).toBeTrue();
        expect(submit.disabled).toBeTrue();

    });

    it('submit button should be enabled when form is valid', () => {
         const credentials = {
            emailId: 'test@mail.com',
            password: '123456'
        };

        component.form.setValue(credentials);
        fixture.detectChanges();

        const el = fixture.nativeElement;
        const submit = el.querySelector('[data-testid="LoginSubmit"]') as HTMLButtonElement;
        expect(component.form.valid).toBeTrue();
        expect(submit.disabled).toBeFalse();
    });

    it('should dispatch loginUser action with correct payload on submit', () => {
         const credentials = {
            emailId: 'test@mail.com',
            password: '123456'
        };

        component.form.setValue(credentials);

         (component as any).formDir = {
            resetForm: jasmine.createSpy('resetForm')
        };

        component.onSubmit();

        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        expect(store.dispatch).toHaveBeenCalledWith(
            AuthActions.loginUser({ payload: credentials })
        );

    });

});