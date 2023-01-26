import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  BookingDocumentStatus,
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin, CommunicationChannelCode,
  DeliveryTypeAtDestination,
  ReceiptTypeAtOrigin, ReferenceType, WeightUnit
} from '../../../projects/bkg-swagger-client';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  // Wrap it in an observable to make it easier to move this into a file/API later if needed.
  private bookingStatuses$ = new BehaviorSubject(
    new Map()
      .set(BookingDocumentStatus.RECE, 'Received')
      .set(BookingDocumentStatus.PENU, 'Pending update (awaiting shipper)')
      .set(BookingDocumentStatus.PENC, 'Pending confirmation')
      .set(BookingDocumentStatus.CONF, 'Confirmed')
      .set(BookingDocumentStatus.CANC, 'Cancelled')
      .set(BookingDocumentStatus.REJE, 'Rejected by Carrier')
      .set(BookingDocumentStatus.CMPL, 'Completed')
  ).asObservable();

  private deliveryTypeAtDestination$ = new BehaviorSubject(
    new Map()
      .set(DeliveryTypeAtDestination.CY, 'Container yard (incl. rail ramp)')
      .set(DeliveryTypeAtDestination.CFS, 'Store Door')
      .set(DeliveryTypeAtDestination.SD, 'Container Freight Station')
  ).asObservable();

  private receiptTypeAtOrigin$ = new BehaviorSubject(
    new Map()
      .set(ReceiptTypeAtOrigin.CY, 'Container yard (incl. rail ramp)')
      .set(ReceiptTypeAtOrigin.CFS, 'Store Door')
      .set(ReceiptTypeAtOrigin.SD, 'Container Freight Station')
  ).asObservable();

  private cargoMovementTypeAtDestination$ = new BehaviorSubject(
    new Map()
      .set(CargoMovementTypeAtDestination.BB, 'Break Bulk')
      .set(CargoMovementTypeAtDestination.FCL, 'Full Container Load')
      .set(CargoMovementTypeAtDestination.LCL, 'Less than Container Load')
  ).asObservable();

  private cargoMovementTypeAtOrigin$ = new BehaviorSubject(
    new Map()
      .set(CargoMovementTypeAtOrigin.BB, 'Break Bulk')
      .set(CargoMovementTypeAtOrigin.FCL, 'Full Container Load')
      .set(CargoMovementTypeAtOrigin.LCL, 'Less than Container Load')
  ).asObservable();

  private communicationChannelCode$ = new BehaviorSubject(
    new Map()
      .set(CommunicationChannelCode.AO, 'API')
      .set(CommunicationChannelCode.EM, 'Email')
      .set(CommunicationChannelCode.EI, 'EDI transmission')
  ).asObservable();

  private weightUnit$ = new BehaviorSubject(
    new Map()
      .set(WeightUnit.KGM, 'Kilograms')
      .set(WeightUnit.LBR, 'Pounds')
  ).asObservable();

  private referenceType$ = new BehaviorSubject(
    new Map()
      .set(ReferenceType.AAO, 'Consignee’s Reference')
      .set(ReferenceType.AES, 'Automated Export System')
      .set(ReferenceType.FF, 'Freight Forwarder’s Reference')
      .set(ReferenceType.SI, 'Shipper’s Reference')
      .set(ReferenceType.PO, 'Purchase Order Reference')
      .set(ReferenceType.CR, 'Customer’s Reference')
      .set(ReferenceType.ECR, 'Empty container release reference')
      .set(ReferenceType.CSI, 'Customer shipment ID')
      .set(ReferenceType.BPR, 'Booking party reference number')
      .set(ReferenceType.BID, 'Booking Request ID')
      .set(ReferenceType.RUC, 'Registro Único del Contribuyente')
      .set(ReferenceType.DUE, 'Declaração Única de Exportação')
      .set(ReferenceType.CER, 'Canadian Export Reporting System')
  ).asObservable();


  constructor() { }

  getBookingStatusMap(): Observable<Map<BookingDocumentStatus, string>> {
    return this.bookingStatuses$;
  }

  getDeliveryTypeAtDestinationNames(): Observable<Map<DeliveryTypeAtDestination, string>> {
    return this.deliveryTypeAtDestination$;
  }

  getReceiptTypeAtOriginNames(): Observable<Map<ReceiptTypeAtOrigin, string>> {
    return this.receiptTypeAtOrigin$;
  }

  getCargoMovementTypeAtDestinationNames(): Observable<Map<CargoMovementTypeAtDestination, string>> {
    return this.cargoMovementTypeAtDestination$;
  }

  getCargoMovementTypeAtOriginNames(): Observable<Map<CargoMovementTypeAtOrigin, string>> {
    return this.cargoMovementTypeAtOrigin$;
  }

  getCommunicationChannelCodeNames(): Observable<Map<CommunicationChannelCode, string>> {
    return this.communicationChannelCode$;
  }

  getWeightUnitNames(): Observable<Map<WeightUnit, string>> {
    return this.weightUnit$;
  }

  getReferenceTypeNames(): Observable<Map<ReferenceType, string>> {
    return this.referenceType$;
  }
}

