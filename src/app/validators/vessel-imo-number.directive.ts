import {Directive, ElementRef, Self} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {IMOValidatorFn} from './validators';

@Directive({
  selector: '[appVesselIMONumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: VesselIMONumberDirective, multi: true}]
})
export class VesselIMONumberDirective implements Validator {

  constructor(@Self() private readonly element: ElementRef) {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    return IMOValidatorFn(control);
  }

}
