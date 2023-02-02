import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {
  BookingDocumentStatus,
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin, CommunicationChannelCode,
  DeliveryTypeAtDestination,
  ReceiptTypeAtOrigin, ReferenceType, ShipmentLocationTypeCode, VolumeUnit, WeightUnit
} from '../../../projects/bkg-swagger-client';
import {SelectItem} from 'primeng/api/selectitem';

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

  private volumeUnit$ = new BehaviorSubject(
    new Map()
      .set(VolumeUnit.MTQ, 'Cubic meter')
      .set(VolumeUnit.FTQ, 'Cubic foot')
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

  private shipmentLocationTypeCode$ = new BehaviorSubject(
    new Map()
      .set(ShipmentLocationTypeCode.PRE, 'Place of Receipt')
      .set(ShipmentLocationTypeCode.POL, 'Port of Loading')
      .set(ShipmentLocationTypeCode.POD, 'Port of Discharge')
      .set(ShipmentLocationTypeCode.PDE, 'Place of Delivery')
      .set(ShipmentLocationTypeCode.PCF, 'Pre-carriage From')
      .set(ShipmentLocationTypeCode.PSR, 'Pre-carriage under shipper’s responsibility')
      .set(ShipmentLocationTypeCode.OIR, 'Onward In-land Routing')
      .set(ShipmentLocationTypeCode.DRL, 'Depot release location')
      .set(ShipmentLocationTypeCode.ORI, 'Booking party reference number')
      .set(ShipmentLocationTypeCode.IEL, 'Origin of goods')
      .set(ShipmentLocationTypeCode.PTP, 'Container intermediate export stop off location')
      .set(ShipmentLocationTypeCode.RTP, 'Requested transshipment port')
      .set(ShipmentLocationTypeCode.FCD, 'Full container drop-off location')
      .set(ShipmentLocationTypeCode.ECP, 'Empty container pick-up location')
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

  getVolumeUnitNames(): Observable<Map<VolumeUnit, string>> {
    return this.volumeUnit$;
  }

  getReferenceTypeNames(): Observable<Map<ReferenceType, string>> {
    return this.referenceType$;
  }

  getShipmentLocationTypeCodeNames(): Observable<Map<ShipmentLocationTypeCode, string>> {
    return this.shipmentLocationTypeCode$;
  }

  getWeightUnitSelectItems(): Observable<SelectItem<WeightUnit|null>[]> {
    return this.enumValues(
      WeightUnit,
      this.getWeightUnitNames(),
    );
  }

  getVolumeUnitSelectItems(): Observable<SelectItem<VolumeUnit|null>[]> {
    return this.enumValues(
      VolumeUnit,
      this.getVolumeUnitNames(),
    );
  }

  private enumValues<E>(enumClass: E, data2name?: Observable<Map<E[keyof E], string>>): Observable<SelectItem<E[keyof E]|null>[]> {
    const v: any = []
    for (const x in enumClass) {
      v.push(x);
    }
    if (data2name) {
      return data2name.pipe(
        map(m => v.map((e: E[keyof E]) => this.withCustomLabel(e, m)))
      );
    }
    return of(v.map(this.codeAsLabel));
  }

  private withCustomLabel<E>(e: E, m: Map<E, string>): SelectItem<E> {
    const name = m.get(e);
    if (!name) {
      return this.codeAsLabel(e);
    }
    return {
      label: `${name} (code: ${e})`,
      value: e,
    }
  }

  private codeAsLabel<E>(e: E): SelectItem<E> {
    return {
      label: `${e}`,
      value: e,
    }
  }

}
