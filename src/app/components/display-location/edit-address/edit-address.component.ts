import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {Address} from '../../../../../projects/bkg-swagger-client';

export interface RequiredAddressFields {
  name?: boolean;
  street?: boolean;
  streetNumber?: boolean;
  floor?: boolean;
  postCode?: boolean;
  city?: boolean;
  stateRegion?: boolean;
  country?: boolean;
}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditAddressComponent {

  @Input()
  address?: Address;

  @Output()
  addressChange = new EventEmitter<Address>();

  @Input()
  required = true;

  _forceAddress = false;

  @Input()
  set forceAddress(newValue: boolean) {
    this._forceAddress = newValue;
    if (!this.hasAddress) {
      if (!this.address) {
        this.onAddressSlideToggleChange();
      } else {
        this.hasAddress = true;
      }
    }
  }

  @Input()
  requiredFields?: RequiredAddressFields;

  hasAddress = false;

  onAddressSlideToggleChange(): void {
    this.hasAddress = !this.hasAddress;
    if (this.hasAddress && !this.address) {
      this.address = {};
    }
    this.address = this.hasAddress ? this.address! : undefined;
    this.addressChange.emit(this.address);
  }
}
