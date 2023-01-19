
// Subset of the fields in the API.
import {
  Booking,
  BookingDeep,
  BookingRefStatus,
  BookingShallow,
  BookingShallowCore,
  BookingSummary, CarrierBookingRequestReference
} from '../../../projects/bkg-swagger-client';
import {EDocLocation} from './location';


// For the attributes the UI computes
interface BookingUISupport {
  uiDocumentStatus?: string;
}

// For all the attributes that get lost due to `allOf` and we cannot
// find the model to extend. :-/
interface BookingBaseAllOfWorkaround {

  carrierBookingRequestReference: CarrierBookingRequestReference;
}

// Separate class for Booking to resolve subclass issues and attributes
// specific to booking.
interface BookingAllOfWorkaround extends Booking, BookingDeep {
  // Are present, but mangled into an `any` for some reason.
  invoicePayableAt?: EDocLocation;
  placeOfBLIssue?: EDocLocation;
}

export interface BookingSummaryEntity extends BookingSummary, BookingRefStatus, BookingBaseAllOfWorkaround, BookingUISupport {

}

export interface BookingEntity extends BookingAllOfWorkaround, BookingRefStatus, BookingShallow, BookingShallowCore, BookingBaseAllOfWorkaround, BookingUISupport {

}
