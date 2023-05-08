import { TestBed } from '@angular/core/testing';

import { ShippingInstructionService } from './shipping-instruction.service';

describe('ShippingInstructionService', () => {
  let service: ShippingInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
