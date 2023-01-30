import {Component, Input, OnInit, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validators} from '@angular/forms';
import {EDocLocation} from '../../../models/location';
import {Address} from '../../../../../projects/bkg-swagger-client';


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

  constructor(@Self() public controlDir: NgControl) {
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
    if (this.needAddressOrUNLocationCode) {
      return {
        'locationMissingContent': "Must provide an Address or a UNLocationCode",
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
