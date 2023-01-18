import {BookingDocumentStatus} from './booking-document-status';
import {EDocLocation} from './location';

export interface BookingBase {
  carrierBookingRequestReference: string;
  documentStatus: BookingDocumentStatus;
  uiDocumentStatus: string | undefined;
  bookingRequestUpdatedDateTime: Date;
  expectedDepartureDate: Date;
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
}
