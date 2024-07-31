import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCodeComponent } from './modify-code.component';

describe('ModifyCodeComponent', () => {
  let component: ModifyCodeComponent;
  let fixture: ComponentFixture<ModifyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
