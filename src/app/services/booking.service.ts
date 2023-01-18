import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Globals} from '../models/globals';
import {map, mergeMap, Observable, tap} from 'rxjs';
import {Booking, BookingSummary} from '../models/booking';
import {StaticDataServiceService} from './static-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly BOOKING_SUMMARY_URL: string;
  private readonly BOOKING_URL: string;
  private readonly LIMIT = 50;

  constructor(private httpClient: HttpClient,
              private staticDataService: StaticDataServiceService,
              private globals: Globals,
              ) {
    this.BOOKING_SUMMARY_URL = globals.config!.bkgBackendURL + '/booking-summaries';
    this.BOOKING_URL = globals.config!.bkgBackendURL + '/bookings';
  }

  getBooking(carrierBookingRequestReference: string): Observable<Booking> {
    return this.httpClient.get<Booking>(this.BOOKING_URL +'/' + carrierBookingRequestReference).pipe(
      mergeMap(booking => {
        return this.staticDataService.getBookingStatusMap().pipe(
          tap(statusMap => booking.uiDocumentStatus = statusMap.get(booking.documentStatus)),
          map(_ => booking),
        )
      })
    )
  }

  getBookingSummaries(): Observable<BookingSummary[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', this.LIMIT);
    httpParams = httpParams.set('sort', 'bookingRequestUpdatedDateTime:DESC')

    return this.httpClient.get<BookingSummary[]>(this.BOOKING_SUMMARY_URL, {
      params: httpParams
    }).pipe(
      mergeMap(summaries => {
        return this.staticDataService.getBookingStatusMap().pipe(
          tap(statusMap => summaries.forEach((b) => b.uiDocumentStatus = statusMap.get(b.documentStatus))),
          map(_ => summaries),
        )
      })
    );
  }
}
