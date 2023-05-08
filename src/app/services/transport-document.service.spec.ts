import { TestBed } from '@angular/core/testing';

import { TransportDocumentService } from './transport-document.service';

describe('TransportDocumentService', () => {
  let service: TransportDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
