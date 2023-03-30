import { TestBed } from '@angular/core/testing';

import { DocumentPartyReferenceService } from './document-party-reference.service';

describe('DocumentPartyReferenceService', () => {
  let service: DocumentPartyReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentPartyReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
