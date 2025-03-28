import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthImplementationComponent } from './auth-implementation.component';

describe('AuthImplementationComponent', () => {
  let component: AuthImplementationComponent;
  let fixture: ComponentFixture<AuthImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthImplementationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
