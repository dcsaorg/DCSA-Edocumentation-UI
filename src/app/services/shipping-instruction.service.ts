import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../models/globals';
import {Observable} from 'rxjs';
import {ShippingInstruction} from '../models/shipping-instruction';

@Injectable({
  providedIn: 'root'
})
export class ShippingInstructionService {

  private readonly SI_URL;
  constructor(private httpClient: HttpClient,
              private globals: Globals,
  ) {
    this.SI_URL = globals.config!.eblBackendURL + '/shipping-instructions';
  }

  getShippingInstruction(documentReference: string): Observable<ShippingInstruction> {
    return this.httpClient.get<ShippingInstruction>(`${this.SI_URL}/${documentReference}`);
  }
}
