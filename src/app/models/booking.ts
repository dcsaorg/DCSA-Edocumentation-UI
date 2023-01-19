import {Booking} from '../auto-generated/model/booking';
import {BookingDeep} from '../auto-generated/model/bookingDeep';
import {BookingShallow} from '../auto-generated/model/bookingShallow';
import {BookingShallowCore} from '../auto-generated/model/bookingShallowCore';
import {BookingSummary} from '../auto-generated/model/bookingSummary';

// Subset of the fields in the API.
export interface BookingSummaryEntity extends BookingSummary {

}

export interface BookingEntity extends Booking, BookingDeep, BookingShallow, BookingShallowCore  {

}
