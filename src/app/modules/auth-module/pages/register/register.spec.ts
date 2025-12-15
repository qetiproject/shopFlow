import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import * as AuthActions from '@auth-module';
import { Register } from "@auth-module";
import { Store } from "@ngrx/store";
import { provideMockStore, setupComponent } from "@test-utils";

describe('Register', () => {
    let component: Register;
    let fixture: ComponentFixture<Register>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Register],
            providers: [
                provideRouter([]),
                provideMockStore()
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        const setup = setupComponent(Register);
        fixture = setup.fixture;
        component = setup.instance;
    });

    it('creates a component', () => {
        expect(component).toBeTruthy();
    });

    it('should render Register title', () => {
        const el: HTMLElement = fixture.nativeElement;
        const title = el.querySelector('[data-testid="RegisterTitle"]');
        expect(title).toBeTruthy();
    });

    it('form should be invalid initially', () => {
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

        component.form.patchValue(credentials);
        fixture.detectChanges();

        const el = fixture.nativeElement;
        const submit = el.querySelector('[data-testid="RegisterSubmit"]') as HTMLButtonElement;
        expect(component.form.valid).toBe(true);
        expect(submit.disabled).toBe(false);
    });

    it('should dispatch registerUser action with correct payload on submit', () => {
        const credentials = {
            emailId: 'test23@mail.com',
            password: '12345678',
            fullName: 'keti',
        };

        component.form.patchValue(credentials);

        (component as any).formDir = {
            resetForm: jasmine.createSpy('resetForm')
        };
    
        component.onSubmit();
        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        expect(store.dispatch).toHaveBeenCalledWith(
            AuthActions.registerUser({
                payload: credentials
            })
        );
        
    });
})