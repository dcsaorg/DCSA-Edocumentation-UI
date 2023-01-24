import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MutableBookingEntity} from '../../../models/booking';
import {BookingService} from '../../../services/booking.service';
import {first, Observable, of} from 'rxjs';
import {
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin,
  CommunicationChannelCode,
  DeliveryTypeAtDestination,
  ReceiptTypeAtOrigin,
  WeightUnit
} from '../../../../../projects/bkg-swagger-client';
import {NgForm} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ErrorMessageExtractor} from '../../../util/error-message-extractor';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss']
})
export class BookingEditorComponent implements OnInit {

  carrierBookingRequestReference?: string;
  hadLoadError = false;
  isCreateMode = false;
  booking?: MutableBookingEntity;
  // Enums for drop-downs
  deliveryTypeAtDestinationValues$ = this.enumValues(DeliveryTypeAtDestination);
  receiptTypeAtOriginValues$ = this.enumValues(ReceiptTypeAtOrigin);

  cargoMovementTypeAtDestinationValues$ = this.enumValues(CargoMovementTypeAtDestination);
  cargoMovementTypeAtOriginValues$ = this.enumValues(CargoMovementTypeAtOrigin);

  weightUnitValues$ = this.enumValues(WeightUnit);
  communicationChannelCodeValues$ = this.enumValues(CommunicationChannelCode);

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService,
              private router: Router,

              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              ) {
  }

  ngOnInit(): void {
    const carrierBookingRequestReference = this.route.snapshot.params['cbrr'];
    this.carrierBookingRequestReference = carrierBookingRequestReference;
    if (carrierBookingRequestReference) {
      this.isCreateMode = false;
      this.bookingService.getBooking(carrierBookingRequestReference)
        .pipe(first())
        .subscribe({
          next: booking => {
            this.booking = this.bookingService.replaceWithMutableBooking(booking);
            this.hadLoadError = false;
          },
          error: _ => {
            this.hadLoadError = true;
          }
        });
    } else {
      this.isCreateMode = true;
      this.booking = this.bookingService.createStubBooking()
      this.addCommodity();
    }
  }

  enumValues(enumClass: any): Observable<any[]> {
    const v = []
    for (const x in enumClass) {
      v.push(x);
    }
    return of(v);
  }

  submit() {
    let bookingSubmission$;
    let errorTitle: string;
    if (this.isCreateMode) {
      bookingSubmission$ = this.bookingService.postNewBooking(this.booking!);
      errorTitle = 'Error while creating a booking'
    } else {
      bookingSubmission$ = this.bookingService.putBooking(this.carrierBookingRequestReference!, this.booking!);
      errorTitle = 'Error while updating/amending booking'
    }
    bookingSubmission$.pipe(first())
        .subscribe({
          next: ref => {
            this.router.navigate(['/bookings', ref.carrierBookingRequestReference]).then()
          }, error: error => {
            const errorMessage = ErrorMessageExtractor.getConcreteErrorMessage(error);
            this.messageService.add({
              key: 'GenericErrorToast',
              severity: 'error',
              summary: `${errorTitle} 😱`,
              detail: errorMessage
            });
          }
        });
  }

  addCommodity(): void {
    this.booking?.commodities.push({
      HSCode: '',
      cargoGrossVolume: undefined,
      cargoGrossVolumeUnit: undefined,
      cargoGrossWeight: 0,
      cargoGrossWeightUnit: WeightUnit.KGM,
      commodityType: '',
      dangerousGoods: undefined,
      exportLicenseExpiryDate: '',
      exportLicenseIssueDate: '',
      numberOfPackages: 0,
      requestedEquipments: undefined
    })
  }

  removeCommodity(i: number): void {
    this.booking?.commodities.splice(i, 1);
  }

  /*
  findFirstError(elem: Element) {
    const c = elem.querySelector(".ng-invalid");
    if (c) {
      c.scrollIntoView();
    }
  }
   */

  allFormControls(ngForm: NgForm): string[] {
    return Object.keys(ngForm.controls);
  }

  cancel(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to discard your changes?',
      accept: () => {
        const dest = this.carrierBookingRequestReference
          ? ['/bookings', this.carrierBookingRequestReference!]
          : ['/latest-bookings'];
        this.router.navigate(dest).then();
      }
    });

  }
}
