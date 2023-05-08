import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../models/globals';
import {Observable} from 'rxjs';
import {IssueTDDraftRequest} from '../models/carrier-action';
import {TransportDocumentChangeResponse} from '../models/transport-document';

@Injectable({
  providedIn: 'root'
})
export class CarrierActionService {

  private readonly UNOFFICIAL_TD_URL: string;

  constructor(private httpClient: HttpClient,
              private globals: Globals,
  ) {
    // this.BOOKING_SUMMARY_URL = globals.config!.bkgBackendURL + '/booking-summaries';
    this.UNOFFICIAL_TD_URL = globals.config!.eblUnofficialBackendURL + '/transport-documents';
  }


  changeTDStatus(documentReference: string, newStatus: string, reason?: string): Observable<TransportDocumentChangeResponse> {
    return this.httpClient.post<TransportDocumentChangeResponse>(`${this.UNOFFICIAL_TD_URL}/${documentReference}/change-state`, {
      documentStatus: newStatus,
      reason,
    });
  }

  issueDraftTD(request: IssueTDDraftRequest): Observable<TransportDocumentChangeResponse> {
    return this.httpClient.post<TransportDocumentChangeResponse>(this.UNOFFICIAL_TD_URL, request);
  }
}
