import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentPartyReference, ShipperOrReference, ShipperParty} from '../../../models/ndoc-party';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {createShipperParty} from '../../../util/object-factory';
import {DocumentPartyReferenceService} from '../../../services/document-party-reference.service';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

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
    if (!p) {
      this.previousPartyType = null;
    } else if (this.isDocumentPartyReference(p)) {
      this.previousPartyType = 'existing-party';
      this.savedReference = p;
    } else {
      this.previousPartyType = 'new-party';
      this.savedParty = p;
    }
    // Set previous party type to avoid emitting to the parent component
    this.partyType$.next(this.previousPartyType);
  }

  @Output()
  partyChange = new EventEmitter<ShipperOrReference|undefined>();

  partyType$ = new BehaviorSubject<PartyType | null>(null);
  private previousPartyType : PartyType | null = this.partyType$.value;

  party$ : Observable<ShipperOrReference|undefined> = this.partyType$.pipe(
    map(partyType => {
      let party;
      switch (partyType) {
        case null:
          party = undefined;
          break;
        case 'existing-party':
          party = this.savedReference;
          break;
        case 'new-party':
          party = this.savedParty;
          break;
        default:
          console.log("ERROR, missing case for ", partyType);
          break;
      }
      if (this.previousPartyType !== partyType) {
        this.partyChange.emit(party);
        this.changeDetectorRef.detectChanges();
      }
      this.previousPartyType = partyType;
      return party;
    }),
  );

  documentPartyReferenceChoices$ = this.documentPartyReferenceService.getDocumentPartyReferences();

  constructor(private documentPartyReferenceService: DocumentPartyReferenceService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  isDocumentPartyReference(p: object): p is DocumentPartyReference {
    return 'carrierPartyReference' in p;
  }
}
