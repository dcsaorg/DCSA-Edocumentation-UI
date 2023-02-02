import {AbstractControl, AbstractFormGroupDirective, NgControl} from '@angular/forms';

export function clearValidationIssuesOnFormGroupDirective(formGroupDirective: AbstractFormGroupDirective): void {
  const controls = formGroupDirective.control.controls;
  for (const controlsKey in controls) {
    const control = controls[controlsKey];
    clearValidationIssuesOnControl(control);
  }
}

export function clearValidationIssuesOnNgControl(ngControl: NgControl): void {
  const control = ngControl.control;
  if (control) {
    clearValidationIssuesOnControl(control);
  }
}

export function clearValidationIssuesOnControl(control: AbstractControl): void {
  control.clearValidators();
  control.updateValueAndValidity();
}
