import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentPartyReference, ShipperOrReference, ShipperParty} from '../../../models/ndoc-party';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {createShipperParty} from '../../../util/object-factory';

type PartyType = 'existing-party' | 'new-party';

@Component({
  selector: 'app-edit-shipper-party',
  templateUrl: './edit-shipper-party.component.html',
  styleUrls: ['./edit-shipper-party.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditShipperPartyComponent {

  _party?: ShipperOrReference

  private savedReference: DocumentPartyReference = {
    carrierPartyReference: '',
  };

  private savedParty: ShipperParty = createShipperParty();


  @Input()
  required: boolean = false;

  @Input()
  allowUndefined: boolean = false;

  @Input()
  set party(p: ShipperOrReference|undefined) {
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
  partyChange = new EventEmitter<ShipperOrReference|undefined>();

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
