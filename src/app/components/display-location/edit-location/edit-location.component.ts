import {Component, Input, OnInit, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {EDocLocation} from '../../../models/location';
import {Address} from '../../../../../projects/bkg-swagger-client';


const UNLocationOrAddressValidator = (control: AbstractControl) => {
  const value = control.value;
  if (!value) {
    return null;
  }
  if (value.UNLocationCode || value.address) {
    return null;
  }
  return {
    "locationMissingContent": "Either UNLocationCode or an address must be provided",
  };
}

function validateUNLocationOrAddress(component: EditLocationComponent): ValidatorFn {
  return (control) => {
    if (!component.hasValue) {
      return null;
    }
    if (component.location?.UNLocationCode || component.hasAddress) {
      return null;
    }
    return {
      "locationMissingContent": "Either UNLocationCode or an address must be provided",
    };
  }
}



@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
})
export class EditLocationComponent implements OnInit, ControlValueAccessor {

  onTouched = () => {};
  onChanged = (_: EDocLocation|null) => {};

  location: EDocLocation|null = null;
  hasValue: boolean = false;
  hasAddress: boolean = false;

  address: Address|null = null;

  missingAddressContent = false;

  constructor(@Self() private controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control
    control!.addValidators(this.validate.bind(this));
    control!.updateValueAndValidity();
  }


  get needAddressOrUNLocationCode(): boolean {
    if (!this.hasValue) {
      return false;
    }
    return !this.location?.UNLocationCode && !this.hasAddress;
  }

  onLocationSlideToggleChange(): void {
    this.hasValue = !this.hasValue;
    if (this.hasValue && !this.location) {
      this.location = {};
    }
    this.emitChange();
    this.emitTouchedEvent();
  }

  onAddressSlideToggleChange(): void {
    this.hasAddress = !this.hasAddress;
    if (this.hasAddress && !this.address) {
      this.address = {};
    }
    this.location!.address = this.hasAddress ? this.address! : undefined;
    this.emitChange();
    this.emitTouchedEvent();
  }

  emitChange(): void {
    this.missingAddressContent = (this.hasAddress
      && this.address
      && Object.values(this.address).filter(v => !!v).length < 1
    ) ?? false;
    this.onChanged(this.hasValue ? this.location : null);
  }

  emitTouchedEvent(): void {
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // FIXME:
  }

  writeValue(obj: EDocLocation|null): void {
    this.location = obj;
    this.hasValue = !!obj;
    this.hasAddress = !!obj?.address
    this.address = obj?.address ?? null;
  }

  validate(_: AbstractControl): ValidationErrors | null {
    if (!this.hasValue) {
      return null;
    }
    if (this.needAddressOrUNLocationCode) {
      return {
        'location.missingContent': "Must provide an Address or a UNLocationCode",
      };
    }
    if (this.missingAddressContent) {
      return {
        'location.address.missingContent': "Must provide at least one field of the Address",
      }
    }
    return null;
  }

}
