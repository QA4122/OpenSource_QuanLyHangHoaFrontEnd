import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckScannedComponent } from './check-scanned.component';

describe('CheckScannedComponent', () => {
  let component: CheckScannedComponent;
  let fixture: ComponentFixture<CheckScannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckScannedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckScannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
