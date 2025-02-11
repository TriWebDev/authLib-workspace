import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTemplateComponent } from './register-template.component';

describe('RegisterTemplateComponent', () => {
  let component: RegisterTemplateComponent;
  let fixture: ComponentFixture<RegisterTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
