import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProductPopupComponent } from './modify-product-popup.component';

describe('ModifyProductPopupComponent', () => {
  let component: ModifyProductPopupComponent;
  let fixture: ComponentFixture<ModifyProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProductPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
