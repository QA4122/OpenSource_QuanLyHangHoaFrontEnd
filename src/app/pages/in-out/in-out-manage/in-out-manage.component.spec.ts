import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutManageComponent } from './in-out-manage.component';

describe('InOutManageComponent', () => {
  let component: InOutManageComponent;
  let fixture: ComponentFixture<InOutManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
