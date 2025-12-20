import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesLogin } from './login';

describe('FeaturesLogin', () => {
  let component: FeaturesLogin;
  let fixture: ComponentFixture<FeaturesLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
