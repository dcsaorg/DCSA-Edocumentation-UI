
// Subset of the fields in the API.
import {
  Booking,
  BookingChannelReference,
  BookingDeep,
  BookingDocumentStatus,
  BookingRefStatus,
  BookingShallow,
  BookingShallowCore,
  BookingSummary,
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin,
  CarrierBookingRequestReference, CommunicationChannelCode,
  VesselIMONumber,
  VesselName
} from '../../../projects/bkg-swagger-client';
import {EDocLocation} from './location';


// For the attributes the UI computes
interface BookingUISupport {
  uiDocumentStatus?: string;
}

interface BookingSummaryAllOfWorkaround {
  carrierBookingRequestReference: CarrierBookingRequestReference;
}

// Separate class for Booking to resolve subclass issues and attributes
// specific to booking.
interface BookingAllOfWorkaround extends Booking, BookingDeep {
  // Are present, but mangled into an `any` for some reason.
  invoicePayableAt?: EDocLocation;
  placeOfBLIssue?: EDocLocation;
}

export interface BookingSummaryEntity extends BookingSummary, BookingRefStatus, BookingSummaryAllOfWorkaround, BookingUISupport {

}

interface BookingBaseEntity extends BookingShallow, BookingShallowCore, BookingAllOfWorkaround, BookingUISupport {
}

export interface BookingEntity extends BookingBaseEntity, BookingRefStatus {
  carrierBookingRequestReference: CarrierBookingRequestReference;
}

export interface MutableBookingEntity extends BookingBaseEntity {}

export interface CreateBookingEntity extends MutableBookingEntity {

}

export interface UpdateBookingEntity extends MutableBookingEntity {
  carrierBookingRequestReference: CarrierBookingRequestReference;
}

export class UpdateBookingEntityImpl implements UpdateBookingEntity {

  bookingChannelReference = undefined;
  cargoMovementTypeAtDestination = undefined;
  cargoMovementTypeAtOrigin = undefined;
  carrierBookingRequestReference = '';
  carrierExportVoyageNumber = undefined;
  carrierServiceCode = undefined;
  carrierServiceName = undefined;
  commodities = [];
  communicationChannelCode = CommunicationChannelCode.AO;
  contractQuotationReference = undefined;
  customsFilingSystems = [];
  declaredValue = undefined;
  declaredValueCurrency = undefined;
  deliveryTypeAtDestination = undefined;
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
  uiDocumentStatus = undefined;
  universalExportVoyageReference = undefined;
  universalServiceReference = undefined;
  valueAddedServices = [];
  vesselIMONumber = undefined;
  vesselName = undefined;



  constructor(booking: Booking) {
    const o = Object.entries(booking).filter((kv) => this.hasOwnProperty(kv[0]))
    Object.assign(this, Object.fromEntries(o));
  }
}
