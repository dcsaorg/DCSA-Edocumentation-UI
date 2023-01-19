import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MutableBookingEntity} from '../../../models/booking';
import {BookingService} from '../../../services/booking.service';
import {first} from 'rxjs';
import {CarrierBookingRequestReference} from '../../../../../projects/bkg-swagger-client';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss']
})
export class BookingEditorComponent implements OnInit {

  carrierBookingRequestReference?: CarrierBookingRequestReference;
  hadLoadError = false;
  isCreateMode = false;
  booking?: MutableBookingEntity;

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService,
              ) {
  }

  ngOnInit() {
    const carrierBookingRequestReference = this.route.snapshot.params['cbrr'];
    this.carrierBookingRequestReference = carrierBookingRequestReference;
    console.log("CBRR:", carrierBookingRequestReference);
    if (carrierBookingRequestReference) {
      this.isCreateMode = false;
      this.bookingService.getBooking(carrierBookingRequestReference)
        .pipe(first())
        .subscribe({
          next: booking => {
            console.log(booking);
            this.booking = this.bookingService.replaceWithMutableBooking(booking);
            console.log(this.booking);
            this.hadLoadError = false;
          },
          error: _ => {
            this.hadLoadError = true;
          }
        });
    } else {
      this.isCreateMode = true;
      this.booking = this.bookingService.createStubBooking()
    }
  }
}
