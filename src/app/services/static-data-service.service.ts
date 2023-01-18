import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookingDocumentStatus} from '../models/booking-document-status';

@Injectable({
  providedIn: 'root'
})
export class StaticDataServiceService {

  private static readonly BOOKING_STATUS_MAP : Map<BookingDocumentStatus, string> = new Map<BookingDocumentStatus, string>()
    .set(BookingDocumentStatus.RECE, 'Received')
    .set(BookingDocumentStatus.PENU, 'Pending update (awaiting shipper)')
    .set(BookingDocumentStatus.PENC, 'Pending confirmation')
    .set(BookingDocumentStatus.CONF, 'Confirmed')
    .set(BookingDocumentStatus.CANC, 'Cancelled')
    .set(BookingDocumentStatus.REJE, 'Rejected by Carrier')
    .set(BookingDocumentStatus.CMPL, 'Completed')
  ;

  // Wrap it in an observable to make it easier to move this into a file/API later if needed.
  private bookingStatuses$: Observable<Map<BookingDocumentStatus, string>> = new BehaviorSubject(
    StaticDataServiceService.BOOKING_STATUS_MAP
  ).asObservable();

  constructor() { }

  getBookingStatusMap(): Observable<Map<BookingDocumentStatus, string>> {
    return this.bookingStatuses$;
  }
}

