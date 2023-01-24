// Subset of the fields in the API.
import {
  Booking,
  BookingRefStatus,
  BookingRequest,
  BookingSummary,
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin,
  CommunicationChannelCode,
  DeliveryTypeAtDestination, ReceiptTypeAtOrigin,
} from '../../../projects/bkg-swagger-client';
import {EDocLocation} from './location';


// For the attributes the UI computes
interface BookingUISupport {
  uiDocumentStatus?: string;
}

interface BookingAllOfWorkaround extends Booking{
  // Are present, but mangled into an `any` for some reason.
  invoicePayableAt?: EDocLocation;
  placeOfBLIssue?: EDocLocation;
}

export interface BookingSummaryEntity extends BookingSummary, BookingRefStatus, BookingUISupport {

}


export interface BookingEntity extends BookingRefStatus, BookingAllOfWorkaround, BookingUISupport {
}

export interface MutableBookingEntity extends BookingRequest {}

export interface CreateBookingEntity extends MutableBookingEntity {

}

export interface UpdateBookingEntity extends MutableBookingEntity {
  carrierBookingRequestReference: string;
}

export class UpdateBookingEntityImpl implements UpdateBookingEntity {

  bookingChannelReference = undefined;
  receiptTypeAtOrigin = ReceiptTypeAtOrigin.CFS;
  cargoMovementTypeAtDestination = CargoMovementTypeAtDestination.BB;
  cargoMovementTypeAtOrigin = CargoMovementTypeAtOrigin.BB;
  carrierBookingRequestReference = '';
  carrierExportVoyageNumber = undefined;
  carrierServiceCode = undefined;
  carrierServiceName = undefined;
  commodities = [];
  communicationChannelCode = CommunicationChannelCode.AO;
  contractQuotationReference = undefined;
  declaredValue = undefined;
  declaredValueCurrency = undefined;
  deliveryTypeAtDestination = DeliveryTypeAtDestination.CFS;
  documentParties = [];
  expectedArrivalAtPlaceOfDeliveryEndDate = undefined;
  expectedArrivalAtPlaceOfDeliveryStartDate = undefined;
  expectedDepartureDate = undefined;
  exportDeclarationReference = undefined;
  importLicenseReference = undefined;
  incoTerms = undefined;
  invoicePayableAt = undefined;
  isCustomsFilingSubmissionByShipper = undefined;
  isEquipmentSubstitutionAllowed = false;
  isExportDeclarationRequired = false;
  isImportLicenseRequired = false;
  isPartialLoadAllowed = false;
  paymentTermCode = undefined;
  placeOfBLIssue = undefined;
  preCarriageModeOfTransportCode = undefined;
  references = [];
  serviceContractReference = undefined;
  shipmentLocations = [];
  transportDocumentReference = undefined;
  transportDocumentTypeCode = undefined;
  universalExportVoyageReference = undefined;
  universalServiceReference = undefined;
  valueAddedServices? = [];
  vesselIMONumber = undefined;
  vesselName = undefined;



  constructor(booking: Booking) {
    const o = Object.entries(booking).filter((kv) => this.hasOwnProperty(kv[0]))
    Object.assign(this, Object.fromEntries(o));
    // FIXME: DDT-1498
    this.valueAddedServices = undefined;
  }
}
