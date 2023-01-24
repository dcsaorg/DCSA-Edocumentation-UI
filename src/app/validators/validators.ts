import {AbstractControl, ValidatorFn} from '@angular/forms';

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
