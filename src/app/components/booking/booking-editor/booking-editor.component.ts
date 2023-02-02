import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MutableBookingEntity} from '../../../models/booking';
import {BookingService} from '../../../services/booking.service';
import {first, map, Observable, of} from 'rxjs';
import {
  CargoMovementTypeAtDestination,
  CargoMovementTypeAtOrigin,
  CommunicationChannelCode,
  DeliveryTypeAtDestination,
  ReceiptTypeAtOrigin,
  ReferenceType,
  ShipmentLocationTypeCode,
  WeightUnit
} from '../../../../../projects/bkg-swagger-client';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ErrorMessageExtractor} from '../../../util/error-message-extractor';
import {StaticDataService} from '../../../services/static-data.service';
import {SelectItem} from 'primeng/api/selectitem';
import {createCommodity} from '../../../util/object-factory';
import {AbstractFormGroupDirective} from '@angular/forms';
import {clearValidationIssuesOnFormGroupDirective} from '../../../util/validation-util';

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
  deliveryTypeAtDestinationValues$ = this.enumValues(
      DeliveryTypeAtDestination,
      this.staticDataService.getDeliveryTypeAtDestinationNames(),
  );

  receiptTypeAtOriginValues$ = this.enumValues(
    ReceiptTypeAtOrigin,
    this.staticDataService.getReceiptTypeAtOriginNames(),
  );

  cargoMovementTypeAtDestinationValues$ = this.enumValues(
    CargoMovementTypeAtDestination,
    this.staticDataService.getCargoMovementTypeAtDestinationNames(),
  );
  cargoMovementTypeAtOriginValues$ = this.enumValues(
    CargoMovementTypeAtOrigin,
    this.staticDataService.getCargoMovementTypeAtOriginNames(),
  );

  communicationChannelCodeValues$ = this.enumValues(
    CommunicationChannelCode,
    this.staticDataService.getCommunicationChannelCodeNames(),
  );

  referenceTypeValues$ = this.enumValues(
    ReferenceType,
    this.staticDataService.getReferenceTypeNames(),
  );

  shipmentLocationTypeCodeNames$ = this.enumValues(
    ShipmentLocationTypeCode,
    this.staticDataService.getShipmentLocationTypeCodeNames(),
  );

  submissionInProgress = false;

  commoditiesSelected: boolean[] = [];
  referencesSelected: boolean[] = [];

  shipmentLocationsSelected: boolean[] = [];

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService,
              private router: Router,

              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private staticDataService: StaticDataService,
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
            this.computeSupportingData();
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

  private computeSupportingData(): void {
    this.commoditiesSelected = this.booking?.commodities?.map(_ => false) ?? [];
    this.referencesSelected = this.booking?.references?.map(_ => false) ?? [];
    this.shipmentLocationsSelected = this.booking?.shipmentLocations?.map(_ => false) ?? [];
  }

  enumValues<E>(enumClass: E, data2name?: Observable<Map<E[keyof E], string>>): Observable<SelectItem<E[keyof E]|null>[]> {
    const v: any = []
    for (const x in enumClass) {
      v.push(x);
    }
    if (data2name) {
      return data2name.pipe(
        map(m => v.map((e: E[keyof E]) => this.withCustomLabel(e, m)))
      );
    }
    return of(v.map(this.codeAsLabel));
  }

  private withCustomLabel<E>(e: E, m: Map<E, string>): SelectItem<E> {
    const name = m.get(e);
    if (!name) {
      return this.codeAsLabel(e);
    }
    return {
      label: `${name} (code: ${e})`,
      value: e,
    }
  }

  private codeAsLabel<E>(e: E): SelectItem<E> {
    return {
      label: `${e}`,
      value: e,
    }
  }

  submit() {
    let bookingSubmission$;
    let errorTitle: string;
    this.submissionInProgress = true;
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
            this.submissionInProgress = false;
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
    this.booking?.commodities.push(createCommodity());
    this.commoditiesSelected.push(true);
  }

  addReference(): void {
    const booking = this.booking;
    if (!booking) {
      return;
    }
    booking.references ??= []
    booking.references.push({
      type: ReferenceType.AAO,
      value: ''
    })
    this.referencesSelected.push(true);
  }

  addShipmentLocation(): void {
    if (!this.booking) {
      return;
    }
    this.booking.shipmentLocations ??= [];
    this.booking.shipmentLocations!.push({
      shipmentLocationTypeCode: ShipmentLocationTypeCode.POL,
      location: {},
      eventDateTime: undefined,
    })
    this.shipmentLocationsSelected.push(true);
  }

  removeCommodity(i: number, modelGroup: AbstractFormGroupDirective): void {
    this.booking!.commodities.splice(i, 1);
    this.commoditiesSelected.splice(i, 1);
    clearValidationIssuesOnFormGroupDirective(modelGroup);
  }

  removeReference(i: number, modelGroup: AbstractFormGroupDirective): void {
    this.booking!.references!.splice(i, 1);
    this.referencesSelected.splice(i, 1);
    clearValidationIssuesOnFormGroupDirective(modelGroup);
  }

  removeShipmentLocation(i: number, modelGroup: AbstractFormGroupDirective): void {
    this.booking!.shipmentLocations!.splice(i, 1);
    this.shipmentLocationsSelected.splice(i, 1);
    clearValidationIssuesOnFormGroupDirective(modelGroup);
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
