import { TestBed } from '@angular/core/testing';

import { StaticDataServiceService } from './static-data-service.service';

describe('StaticDataServiceService', () => {
  let service: StaticDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
