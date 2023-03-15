import {Injectable} from '@angular/core';
import {concatMap, first, from, map, Observable, of, shareReplay, tap, toArray} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FacilityCodeListProvider} from '../../../projects/bkg-swagger-client';

export interface FacilityData {
  name: string;
  code: string;
  codeListProvider: FacilityCodeListProvider;
}

export interface FacilityWithLocation extends FacilityData {
  locationName: string;
  UNLocationCode: string;
}

export interface LocationData {
  name: string;
  UNLocationCode: string;
  facilities: FacilityData[];
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  readonly locationDataFile = 'assets/static-data/location-data.json';
  private facilitiesByLocationCache: Map<string, FacilityWithLocation[]> | null = null;

  locations$ = this.httpClient.get<LocationData[]>(this.locationDataFile).pipe(
    shareReplay(1)
  );

  facilities$ = this.locations$.pipe(
    concatMap(locations => from(locations).pipe(
      concatMap(location => from(this.locationToFacilities(location))),
      toArray(),
    )),
  );

  private id2FacilityCache$ = this.facilities$.pipe(
    map(facilities => {
      const m = new Map<string, FacilityWithLocation>();
      for (const facility of facilities) {
        const id = this.asFacilityID(facility.UNLocationCode, facility.code, facility.codeListProvider);
        m.set(id, facility);
      }
      return m;
    }),
    shareReplay(1),
  );


  constructor(private httpClient: HttpClient) {
  }

  asFacilityID(UNLocationCode?: string, facilityCode?: string, facilityCodeListProvider?: FacilityCodeListProvider) {
    return `${UNLocationCode??''}/${facilityCode??''}/${facilityCodeListProvider??''}`
  }

  lookupFacility(UNLocationCode?: string, facilityCode?: string, facilityCodeListProvider?: FacilityCodeListProvider): Observable<FacilityWithLocation|null> {
    const id = this.asFacilityID(UNLocationCode, facilityCode, facilityCodeListProvider);
    return this.id2FacilityCache$.pipe(
      map(cache => cache.get(id) ?? null),
    );
  }

  private locationToFacilities(location: LocationData): FacilityWithLocation[] {
    return location.facilities.map(f => {
      return {
        code: f.code,
        name: f.name,
        codeListProvider: f.codeListProvider,
        UNLocationCode: location.UNLocationCode,
        locationName: location.name,
      };
    })
  }

  getFacilitiesForLocation(UNLocationCode: string): Observable<FacilityWithLocation[]> {
    if (this.facilitiesByLocationCache) {
      const facilities = this.facilitiesByLocationCache.get(UNLocationCode);
      return of(facilities ?? []);
    }
    return this.locations$.pipe(
      first(),
      map(locations => {
        this.facilitiesByLocationCache = new Map<string, FacilityWithLocation[]>();
        for (const location of locations) {
          const facilities = this.locationToFacilities(location);
          this.facilitiesByLocationCache.set(location.UNLocationCode, facilities)
        }
        return this.facilitiesByLocationCache.get(UNLocationCode) ?? [];
      })
    )
  }
}
