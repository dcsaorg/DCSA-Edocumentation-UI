import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {BookingSummaryEntity} from '../../models/booking';
import {BookingService} from '../../services/booking.service';
import {Globals} from '../../models/globals';
import {Config} from '../../models/config';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookingSummaries$: Observable<BookingSummaryEntity[]> | undefined;
  bookingSummariesLoadingError: boolean = false;

  constructor(private bookingService: BookingService,
              public globals: Globals,
              ) {
  }

  get config(): Config {
    return this.globals.config!;
  }

  ngOnInit(): void {
    this.bookingSummaries$ = this.bookingService.getBookingSummaries().pipe(
        tap({
          next: (_) => {
            this.bookingSummariesLoadingError = false;
          },
          error: (_) => {
            this.bookingSummariesLoadingError = true;
          }
        })
      );
  }

  t = (booking: any): BookingSummaryEntity => booking;

}
