import {AbstractControl, NgModelGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {group} from '@angular/animations';
import {EDocLocation} from '../models/location';

interface IMOValidationErrors {
  minLength: boolean;
  maxLength: boolean;
  digitsOnly: boolean;
  checkDigit: boolean;
  computedCheckDigit: number;
}



const intDigitsOnly: RegExp = /^[0-9]+$/;

export const IMOValidatorFn: ValidatorFn = (control: AbstractControl) => {
  const value: string = control.value;
  if (! value) {
    return null;
  }

  if (value.length !== 7 || !intDigitsOnly.test(value)) {
    return {
      vesselIMONumber: {
        minLength: value.length < 7,
        maxLength: value.length > 7,
        digitsOnly: !intDigitsOnly.test(value),
        checkDigit: false,
        computedCheckDigit: -1,
      } as IMOValidationErrors
    };
  }
  const expectedCheckDigit = parseInt(value.charAt(6), 10);
  let actualCheckDigit = 0;
  for (let i = 0 ; i < 6 ; i++) {
    actualCheckDigit += parseInt(value.charAt(i), 10) * (7 - i);
  }
  actualCheckDigit %= 10;
  if (actualCheckDigit !== expectedCheckDigit) {
    return {
      vesselIMONumber: {
        minLength: false,
        maxLength: false,
        digitsOnly: false,
        checkDigit: true,
        computedCheckDigit: actualCheckDigit
      } as IMOValidationErrors
    };
  }
  return null;
};


export const nonEmptyLocationCheck = (location?: EDocLocation): ValidationErrors | null => {
  if (!location) {
    return null;
  }
  if (location.facilityCode || location.facilityCodeListProvider || location.UNLocationCode) {
    return null;
  }
  if (!!location.address) {
    return null;
  }
  return {
    missingContent: true,
  }
}
