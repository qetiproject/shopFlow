import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { setupComponent } from "@test-utils";
import { SendResetOtp } from "./send-reset-otp";

describe('SendResetOtp', () => {
    let component: SendResetOtp;
    let fixture: ComponentFixture<SendResetOtp>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [
                SendResetOtp,  
            ],
            providers: [
                provideRouter([]),     
                provideHttpClient(),  
                provideHttpClientTesting(),
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        const setup = setupComponent(SendResetOtp);
        fixture = setup.fixture;
        component = setup.instance;
    });

    it('create a component', () => {
        expect(component).toBeTruthy();
    });

    it('should render Forgot Password title', () => {
        const el = fixture.nativeElement;
        const title = el.querySelector('[data-testid="ForgetPassTitle"]');
        expect(title).toBeTruthy();
    });

    it('form should be invalid initially', () => {
        expect(component.email.invalid).toBe(true);
    });

    it('submit button should be disabled when form is invalid', () => {
        const el: HTMLElement = fixture.nativeElement;
        const submit = el.querySelector('[data-testid="submit"]') as HTMLButtonElement;
        expect(component.email.invalid).toBe(true);
        expect(submit.disabled).toBe(true);
    });

    it('email FormControl should be valid for correct email', () => {
        component.email.patchValue('test@gmail.com');
        expect(component.email.valid).toBe(true);
    });

    it('email FormControl invalid for email', () => {
        component.email.patchValue('test@');
        expect(component.email.invalid).toBe(true);
    });

    it('submit button should be enable when form is valid', () => {
        const email = "test@gmail.com";
        component.email.patchValue(email);
        fixture.detectChanges();

        const el: HTMLElement = fixture.nativeElement;
        const submit = el.querySelector('[data-testid="submit"]') as HTMLButtonElement;
        expect(component.email.valid).toBe(true);
        expect(submit.disabled).toBe(false);
    });
});