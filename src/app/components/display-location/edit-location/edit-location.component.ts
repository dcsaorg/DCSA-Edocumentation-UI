import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {EDocLocation} from '../../../models/location';
import {FacilityCodeListProvider} from '../../../../../projects/bkg-swagger-client';
import {StaticDataService} from '../../../services/static-data.service';
import {BehaviorSubject, combineLatest, combineLatestAll, map, Observable, of, switchMap, tap} from 'rxjs';
import {FacilityWithLocation, LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditLocationComponent {


  @Input()
  location?: EDocLocation;

  @Output()
  locationChange = new EventEmitter<EDocLocation>();

  hasValue: boolean = false;
  facilityCodeListProviderItems$ = this.staticDataService.getFacilityCodeListProviderItems();

  locations$ = this.locationService.locations$;

  selectedLocation$ = new BehaviorSubject<string|null>(null);

  facilities$ = this.selectedLocation$.pipe(
    tap(_ => this.facilityChanged()),
    tap(_ => {
      if (this.location) {
        this.locationChange.next(this.location);
      }
    }),
    switchMap(location => {
      if (location) {
        return this.locationService.getFacilitiesForLocation(location);
      }
      return this.locationService.facilities$;
    }),
  )


  private facilityChange$ = new BehaviorSubject<EDocLocation|null>(null);

  currentlySelectedUIFacility$ = this.facilityChange$.pipe(
    switchMap(loc => {
      if (!loc) {
        return of(null);
      }
      return this.locationService.lookupFacility(
        this.location?.UNLocationCode,
        this.location?.facilityCode,
        this.location?.facilityCodeListProvider,
      );
    })
  )
  facilityData$ = combineLatest([this.facilities$, this.currentlySelectedUIFacility$]);

  isRequired = false;

  @Input() set required(value: boolean) {
    this.isRequired = value;
    if (this.isRequired) {
      this.hasValue = true;
      this.location ??= {};
    }
  }

  @Input() enableAddress = true;
  @Input() enableUNLocationCode = true;
  @Input() enableFacility = true;

  constructor(private locationService: LocationService,
              private staticDataService: StaticDataService) {
  }

  get needsContent(): boolean {
    if (!this.hasValue) {
      return false;
    }
    return !this.location?.UNLocationCode && !this.location?.address;
  }

  get needsFacility(): boolean {
    if (!this.hasValue) {
      return false;
    }
    return !!this.location?.facilityCode || !!this.location?.facilityCodeListProvider;
  }

  get facilityCodeMinLength(): number {
    return this.location?.facilityCodeListProvider == FacilityCodeListProvider.SMDG ? 3 : 4;
  }

  get facilityCodeMaxLength(): number {
    return this.location?.facilityCodeListProvider == FacilityCodeListProvider.SMDG ? 6 : 4;
  }

  onLocationSlideToggleChange(): void {
    this.hasValue = !this.hasValue;
    if (this.hasValue && !this.location) {
      this.location = {};
    }
    this.facilityChanged();
    this.locationChange.emit(this.hasValue ? this.location! : undefined);
  }

  newSelectedFacility(facility: FacilityWithLocation | null) {
    const location = this.location;
    if (!location) {
      return;
    }
    location.UNLocationCode = facility?.UNLocationCode;
    location.facilityCode = facility?.code;
    location.facilityCodeListProvider = facility?.codeListProvider;
    this.facilityChange$.next(location);
    this.locationChange.emit(location);
  }

  facilityChanged(): void {
    console.log(this.location);
    this.facilityChange$.next(this.location ?? null);
  }
}
