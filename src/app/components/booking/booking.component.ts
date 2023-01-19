import {Component, OnInit} from '@angular/core';
import {map, mergeMap, Observable, tap} from 'rxjs';
import {BookingEntity} from '../../models/booking';
import {BookingService} from '../../services/booking.service';
import {Globals} from '../../models/globals';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  booking$: Observable<BookingEntity> | undefined;
  bookingLoadingError: boolean = false;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    public globals: Globals,
  ) {
  }

  ngOnInit(): void {
    this.booking$ = this.route.params.pipe(
      tap(p => console.log(p)),
      map(params => params['cbrr']),
      mergeMap(carrierBookingRequestReference => {
        return this.bookingService.getBooking(carrierBookingRequestReference);
      }),
      tap({
        next: (_) => {
          this.bookingLoadingError = false;
        },
        error: (_) => {
          this.bookingLoadingError = true;
        }
      })

    );
  }

}
