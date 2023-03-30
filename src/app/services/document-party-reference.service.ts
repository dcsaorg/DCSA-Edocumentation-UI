import { Injectable } from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import {BookingPartyChoice, DocumentPartyReference} from '../models/ndoc-party';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentPartyReferenceService {

  readonly documentPartyReferenceData = 'assets/static-data/document-party-reference-data.json';

  documentPartyReferenceChoices$ = this.httpClient.get<BookingPartyChoice[]>(this.documentPartyReferenceData).pipe(
    shareReplay(1)
  );
  constructor(private httpClient: HttpClient) {
  }

  getDocumentPartyReferences(): Observable<BookingPartyChoice[]> {
    return this.documentPartyReferenceChoices$;
  }
}
