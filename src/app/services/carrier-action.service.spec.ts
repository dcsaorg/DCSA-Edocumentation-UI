import { TestBed } from '@angular/core/testing';

import { CarrierActionService } from './carrier-action.service';

describe('CarrierActionService', () => {
  let service: CarrierActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrierActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
