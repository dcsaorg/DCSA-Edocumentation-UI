import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {Address} from '../../../../../projects/bkg-swagger-client';

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
