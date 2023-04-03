import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingPartyOrReference, DocumentPartyReference, ShipperOrReference} from '../../../models/ndoc-party';
import {createBookingParty} from '../../../util/object-factory';
import {ControlContainer, NgModelGroup} from '@angular/forms';
import {DocumentPartyReferenceService} from '../../../services/document-party-reference.service';
import {BehaviorSubject, map, Observable} from 'rxjs';


type PartyType = 'by-reference' | 'by-data';

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
    if (!p) {
      this.previousPartyType = null;
    } else if (this.isDocumentPartyReference(p)) {
      this.previousPartyType = 'by-reference';
      this.savedReference = p;
    } else {
      this.previousPartyType = 'by-data';
      this.savedParty = p;
    }
    // Set previous party type to avoid emitting to the parent component
    this.partyType$.next(this.previousPartyType);
  }

  @Output()
  partyChange = new EventEmitter<BookingPartyOrReference|undefined>();

  documentPartyReferenceChoices$ = this.documentPartyReferenceService.getDocumentPartyReferences();

  partyType$ = new BehaviorSubject<PartyType | null>(null);
  private previousPartyType : PartyType | null = this.partyType$.value;
  party$ : Observable<BookingPartyOrReference|undefined> = this.partyType$.pipe(
    map(partyType => {
      let party;
      switch (partyType) {
        case null:
          party = undefined;
          break;
        case 'by-reference':
          party = this.savedReference;
          break;
        case 'by-data':
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

  constructor(private documentPartyReferenceService: DocumentPartyReferenceService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  isDocumentPartyReference(p: object): p is DocumentPartyReference {
    return 'carrierPartyReference' in p;
  }
}
