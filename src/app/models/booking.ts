
// Subset of the fields in the API.
import {
  Booking,
  BookingDeep,
  BookingRefStatus,
  BookingShallow,
  BookingShallowCore,
  BookingSummary, CarrierBookingRequestReference
} from '../../../projects/bkg-swagger-client';


// For the attributes the UI computes
interface BookingUISupport {
  uiDocumentStatus?: string;
}

// For all the attributes that get lost due to `allOf` and we cannot
// find the model to extend. :-/
interface BookingAllOfWorkaround {
  carrierBookingRequestReference: CarrierBookingRequestReference;
}

export interface BookingSummaryEntity extends BookingSummary, BookingRefStatus, BookingAllOfWorkaround, BookingUISupport {

}

export interface BookingEntity extends Booking, BookingRefStatus, BookingDeep, BookingShallow, BookingShallowCore, BookingAllOfWorkaround, BookingUISupport {

}
