import {BookingDocumentStatus} from './booking-document-status';
import {EDocLocation} from './location';
import {Commodity} from './commodity';

export interface BookingBase {
  carrierBookingRequestReference: string;
  documentStatus: BookingDocumentStatus;
  uiDocumentStatus: string | undefined;
  bookingRequestUpdatedDateTime: Date;
  expectedDepartureDate: Date;


  receiptTypeAtOrigin: string; // FIXME enum
  deliveryTypeAtDestination: string; // FIXME enum
  cargoMovementTypeAtOrigin: string; // FIXME enum
  cargoMovementTypeAtDestination: string; // FIXME: enum

  isPartialLoadAllowed: boolean;
  isExportDeclarationRequired: boolean;
  isImportLicenseRequired: boolean;

  communicationChannelCode: string; // FIXME enum
  isEquipmentSubstitutionAllowed: boolean;
}

// Subset of the fields in the API.
export interface BookingSummary extends BookingBase {

}

export interface Booking extends BookingBase {

  vesselName: string;
  vesselIMONumber: string;
  carrierServiceName: string;
  carrierServiceCode: string;
  universalServiceReference: string;
  carrierExportVoyageNumber: string;
  universalExportVoyageReference: string;

  invoicePayableAt: EDocLocation|null;

  commodities: Commodity[];
}
