import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
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
                    useValue: {
                        dispatch: jasmine.createSpy('dispatch')
                    },
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
});