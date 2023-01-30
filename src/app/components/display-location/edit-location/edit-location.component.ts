import {Component, Input, OnInit, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validators} from '@angular/forms';
import {EDocLocation} from '../../../models/location';
import {Address} from '../../../../../projects/bkg-swagger-client';


interface LocationErrors extends ValidationErrors {
}

const ERROR_NO_CONTENT_KEY: keyof LocationErrors = 'locationMissingContent'
const ERROR_NO_CONTENT_MSG = 'No location content provided (beyond the optional Location Name)';

const ERROR_NO_ADDRESS_CONTENT_KEY: keyof LocationErrors = 'locationAddressMissingContent'
const ERROR_NO_ADDRESS_CONTENT_MSG = 'Must provide at least one field of the Address'

const ERROR_INCOMPLETE_FACILITY_KEY: keyof LocationErrors = 'locationIncompleteFacility';
const ERROR_INCOMPLETE_FACILITY_MSG = 'When defining a facility, the fields UNLocationCode, Facility Code, and Facility Code List Provider must all be provided';


const ERROR_KEYS = [
  ERROR_NO_CONTENT_KEY,
  ERROR_NO_ADDRESS_CONTENT_KEY,
  ERROR_INCOMPLETE_FACILITY_KEY,
]


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

  @Input() required = false;
  @Input() enableAddress = true;
  @Input() enableUNLocationCode = true;
  @Input() enableFacility = true;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control
    control!.addValidators(this.validate.bind(this));
    control!.updateValueAndValidity();
  }


  get errorKeys(): string[] {
    return ERROR_KEYS;
  }

  get needsContent(): boolean {
    if (!this.hasValue) {
      return false;
    }
    return !this.location?.UNLocationCode && !this.hasAddress;
  }

  get needsFacility(): boolean {
    if (!this.hasValue) {
      return false;
    }
    return !!this.location?.facilityCode || !!this.location?.facilityCodeListProvider;
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
    // The API never requires any Address field.
    this.missingAddressContent = false;
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

  writeValue(obj: EDocLocation|null): void {
    this.location = obj;
    this.hasValue = !!obj;
    if (this.required && !this.hasValue) {
      this.hasValue = true;
      this.location = {}
    }
    this.hasAddress = !!obj?.address
    this.address = obj?.address ?? null;
  }

  validate(ctrl: AbstractControl): ValidationErrors | null {
    if (!this.hasValue) {
      if (this.required) {
        return Validators.required(ctrl);
      }
      return null;
    }
    const errors: LocationErrors = {}
    let hasErrors = false;
    if (this.needsContent) {
      errors[ERROR_NO_CONTENT_KEY] = ERROR_NO_CONTENT_MSG;
      return errors;
    }
    if (this.missingAddressContent) {
      hasErrors = true;
      errors[ERROR_NO_ADDRESS_CONTENT_KEY] = ERROR_NO_ADDRESS_CONTENT_MSG;
    }
    if (this.needsFacility && !(
      this.location?.facilityCode
      || this.location?.facilityCodeListProvider
      || this.location?.UNLocationCode
    )) {
      hasErrors = true;
      errors[ERROR_INCOMPLETE_FACILITY_KEY] = ERROR_INCOMPLETE_FACILITY_MSG;
    }
    return hasErrors ? errors : null;
  }

}
