import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Globals} from '../models/globals';
import {map, mergeMap, Observable, of, tap} from 'rxjs';
import {BookingEntity, BookingSummaryEntity, MutableBookingEntity, UpdateBookingEntityImpl} from '../models/booking';
import {StaticDataService} from './static-data.service';
import {
  BookingRefStatus,
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin,
  CommunicationChannelCode,
  DeliveryTypeAtDestination,
  ReceiptTypeAtOrigin
} from '../../../projects/bkg-swagger-client';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly BOOKING_SUMMARY_URL: string;
  private readonly BOOKING_URL: string;
  private readonly LIMIT = 50;

  constructor(private httpClient: HttpClient,
              private staticDataService: StaticDataService,
              private globals: Globals,
              ) {
    this.BOOKING_SUMMARY_URL = globals.config!.bkgBackendURL + '/booking-summaries';
    this.BOOKING_URL = globals.config!.bkgBackendURL + '/bookings';
  }

  getBooking(carrierBookingRequestReference: string): Observable<BookingEntity> {
    return this.httpClient.get<BookingEntity>(this.BOOKING_URL +'/' + carrierBookingRequestReference).pipe(
      mergeMap(booking => {
        return this.staticDataService.getBookingStatusMap().pipe(
          tap(statusMap => booking.uiDocumentStatus = statusMap.get(booking.documentStatus)),
          map(_ => booking),
        )
      })
    )
  }


  postNewBooking(booking: MutableBookingEntity): Observable<BookingRefStatus> {
    return this.httpClient.post<BookingRefStatus>(this.BOOKING_URL, booking);
  }

  putBooking(carrierBookingRequestReference: string, booking: MutableBookingEntity): Observable<BookingRefStatus> {
    return this.httpClient.put<BookingRefStatus>(this.BOOKING_URL + '/' + carrierBookingRequestReference, booking);
  }

  getBookingSummaries(): Observable<BookingSummaryEntity[]> {
    if (!this.globals.config!.useBackend) {
      return of([]);
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', this.LIMIT);
    httpParams = httpParams.set('sort', 'bookingRequestUpdatedDateTime:DESC')

    return this.httpClient.get<BookingSummaryEntity[]>(this.BOOKING_SUMMARY_URL, {
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
  replaceWithMutableBooking(booking: BookingEntity): MutableBookingEntity {
    return new UpdateBookingEntityImpl(booking);
  }

  createStubBooking(): MutableBookingEntity {
    return {
      deliveryTypeAtDestination: DeliveryTypeAtDestination.CY,
      receiptTypeAtOrigin: ReceiptTypeAtOrigin.CY,
      cargoMovementTypeAtDestination: CargoMovementTypeAtDestination.BB,
      cargoMovementTypeAtOrigin: CargoMovementTypeAtOrigin.BB,
      commodities: [],
      communicationChannelCode: CommunicationChannelCode.AO,
      isEquipmentSubstitutionAllowed: false,
      isExportDeclarationRequired: false,
      isImportLicenseRequired: false,
      isPartialLoadAllowed: false
    }
  }
}
