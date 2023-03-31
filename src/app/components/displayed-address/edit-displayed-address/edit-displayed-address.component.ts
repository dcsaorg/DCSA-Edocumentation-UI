import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgControl, NgModelGroup} from '@angular/forms';
import {clearValidationIssuesOnNgControl} from '../../../util/validation-util';

@Component({
  selector: 'app-edit-displayed-address',
  templateUrl: './edit-displayed-address.component.html',
  styleUrls: ['./edit-displayed-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditDisplayedAddressComponent {

  @Input()
  displayedAddress?: string[];

  @Output()
  displayedAddressChange = new EventEmitter<string[]>();

  trackDisplayAddressBy<U extends T, T>(index: number, _: T & U): any {
    return index;
  }


  addDisplayedAddressLine(): void {
    this.displayedAddress ??= []
    this.displayedAddress.push('');
    this.displayedAddressChanged();
  }

  displayedAddressChanged(): void {
    this.displayedAddressChange.emit(this.displayedAddress);
  }

  removeAddressLine(j: number, modelGroup: NgControl): void {
    this.displayedAddress!.splice(j, 1);
    this.displayedAddressChanged();
  }

}
