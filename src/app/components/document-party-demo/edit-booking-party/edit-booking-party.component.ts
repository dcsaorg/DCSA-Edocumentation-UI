import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingPartyOrReference, DocumentPartyReference, ShipperOrReference} from '../../../models/ndoc-party';
import {createBookingParty} from '../../../util/object-factory';
import {ControlContainer, NgModelGroup} from '@angular/forms';


type PartyType = 'existing-party' | 'new-party';

@Component({
  selector: 'app-edit-booking-party',
  templateUrl: './edit-booking-party.component.html',
  styleUrls: ['./edit-booking-party.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditBookingPartyComponent {

  _party?: BookingPartyOrReference

  private savedReference: DocumentPartyReference = {
    carrierPartyReference: '',
  };

  private savedParty: BookingPartyOrReference = createBookingParty();


  @Input()
  required: boolean = false;

  @Input()
  allowUndefined: boolean = false;

  @Input()
  displayedAddress: boolean = false;

  @Input()
  set party(p: BookingPartyOrReference|undefined) {
    this._party = p;
    if (!p) {
      this.partyType = undefined
    } else if (this.isDocumentPartyReference(p)) {
      this.partyType = 'existing-party';
      this.savedReference = p;
    } else {
      this.partyType = 'new-party';
      this.savedParty = p;
    }
  }

  @Output()
  partyChange = new EventEmitter<BookingPartyOrReference|undefined>();

  partyType?: PartyType;

  isDocumentPartyReference(p: object): p is DocumentPartyReference {
    return 'carrierPartyReference' in p;
  }

  newPartyType(newPartyType?: PartyType) {
    switch (newPartyType) {
      case undefined:
        this._party = undefined;
        break;
      case 'existing-party':
        this._party = this.savedReference;
        break;
      case 'new-party':
        this._party = this.savedParty;
        break;
    }
    this.partyChange.emit(this._party);
  }
}
