import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {BookingSummary} from '../../models/booking';
import {BookingService} from '../../services/booking.service';
import {Globals} from '../../models/globals';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookingSummaries$: Observable<BookingSummary[]> | undefined;
  bookingSummariesLoadingError: boolean = false;

  constructor(private bookingService: BookingService,
              public globals: Globals,
              ) {
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

  t = (booking: any): BookingSummary => booking;

}
