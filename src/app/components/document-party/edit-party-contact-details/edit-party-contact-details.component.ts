import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PartyContactDetail} from '../../../../../projects/bkg-swagger-client';
import {ControlContainer, NgModelGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-party-contact-details',
  templateUrl: './edit-party-contact-details.component.html',
  styleUrls: ['./edit-party-contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditPartyContactDetailsComponent {

  @Input()
  partyContactDetail?: PartyContactDetail;

  @Output()
  partyContactDetailChange = new EventEmitter<PartyContactDetail>();


  partyContactDetailsChanged() {
    this.partyContactDetailChange.emit(this.partyContactDetail!);
  }

}
