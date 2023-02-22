import {Directive, ElementRef, Input, Self} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {IMOValidatorFn, nonEmptyLocationCheck} from './validators';
import {EDocLocation} from '../models/location';

@Directive({
  selector: '[appNonEmptyLocation]',
  providers: [{provide: NG_VALIDATORS, useExisting: NonEmptyLocationDirective, multi: true}]
})
export class NonEmptyLocationDirective implements Validator {

  @Input()
  location?: EDocLocation;

  validate(control: AbstractControl): ValidationErrors | null {
    return nonEmptyLocationCheck(this.location);
  }

}
