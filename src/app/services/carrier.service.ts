import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay} from 'rxjs';
import {Carrier} from '../models/carrier';


@Injectable({
  providedIn: 'root'
})
export class CarrierService {
  readonly carrierReferenceData = 'assets/static-data/carrier-reference-data.json';

  carrierReferenceChoices$ = this.httpClient.get<Carrier[]>(this.carrierReferenceData).pipe(
    shareReplay(1)
  );
  constructor(private httpClient: HttpClient) {
  }

  getReferenceCarriers(): Observable<Carrier[]> {
    return this.carrierReferenceChoices$;
  }
}
