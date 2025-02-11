import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTemplateComponent } from './login-template.component';

describe('LoginTemplateComponent', () => {
  let component: LoginTemplateComponent;
  let fixture: ComponentFixture<LoginTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
