import { TestBed } from '@angular/core/testing';

import { NotifycationService } from './notifycation.service';

describe('NotifycationService', () => {
  let service: NotifycationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifycationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
