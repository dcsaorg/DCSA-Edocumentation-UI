import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../models/globals';
import {Observable} from 'rxjs';
import {TransportDocument} from '../models/transport-document';

@Injectable({
  providedIn: 'root'
})
export class TransportDocumentService {

  private readonly TD_URL;
  constructor(private httpClient: HttpClient,
              private globals: Globals,
  ) {
    this.TD_URL = globals.config!.eblBackendURL + '/transport-documents';
  }

  getTransportDocument(documentReference: string): Observable<TransportDocument> {
    return this.httpClient.get<TransportDocument>(`${this.TD_URL}/${documentReference}`);
  }
}
