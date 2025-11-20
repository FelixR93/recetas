import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecetaComponent } from './form-receta.component';

describe('FormRecetaComponent', () => {
  let component: FormRecetaComponent;
  let fixture: ComponentFixture<FormRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecetaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
