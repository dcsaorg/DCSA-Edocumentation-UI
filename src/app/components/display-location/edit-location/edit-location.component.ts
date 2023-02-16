import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {EDocLocation} from '../../../models/location';
import {FacilityCodeListProvider} from '../../../../../projects/bkg-swagger-client';
import {StaticDataService} from '../../../services/static-data.service';
import {Observable} from 'rxjs';
import {SelectItem} from 'primeng/api/selectitem';

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
  facilityCodeListProviderItems$: Observable<SelectItem<FacilityCodeListProvider|null>[]>;

  @Input() required = false;
  @Input() enableAddress = true;
  @Input() enableUNLocationCode = true;
  @Input() enableFacility = true;

  constructor(private staticDataService: StaticDataService) {
    this.facilityCodeListProviderItems$ = staticDataService.getFacilityCodeListProviderItems()
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


  get facilityCodeMaxLength(): number {
    return this.location?.facilityCodeListProvider == FacilityCodeListProvider.SMDG ? 3 : 4;
  }

  onLocationSlideToggleChange(): void {
    this.hasValue = !this.hasValue;
    if (this.hasValue && !this.location) {
      this.location = {};
    }
  }
}
