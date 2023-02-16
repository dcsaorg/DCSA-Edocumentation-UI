import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DCSAResponsibleAgencyCode, DocumentParty, PartyFunction} from '../../../../../projects/bkg-swagger-client';
import {StaticDataService} from '../../../services/static-data.service';
import {Observable} from 'rxjs';
import {SelectItem} from 'primeng/api/selectitem';
import {
  clearValidationIssuesOnFormGroupDirective,
  clearValidationIssuesOnNgControl
} from '../../../util/validation-util';
import {AbstractFormGroupDirective, ControlContainer, NgControl, NgModelGroup} from '@angular/forms';
import {createIdentifyingCode, createPartyContactDetails} from '../../../util/object-factory';

@Component({
  selector: 'app-edit-document-party',
  templateUrl: './edit-document-party.component.html',
  styleUrls: ['./edit-document-party.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditDocumentPartyComponent {

  @Input()
  documentParty?: DocumentParty;

  @Output()
  documentPartyChange = new EventEmitter<DocumentParty>();

  partyFunctions$: Observable<SelectItem<PartyFunction|null>[]>;

  dcsaResponsibleAgencyCode$: Observable<SelectItem<DCSAResponsibleAgencyCode|null>[]>;
  constructor(private staticDataService: StaticDataService) {
    this.partyFunctions$ = staticDataService.getPartyFunctionItems();
    this.dcsaResponsibleAgencyCode$ = staticDataService.getDCSAResponsibleAgencyCodeItems();
  }

  trackDisplayAddressBy<U extends T, T>(index: number, _: T & U): any {
    return index;
  }

  removeAddressLine(j: number, modelGroup: NgControl): void {
    this.documentParty!.displayedAddress!.splice(j, 1);
    clearValidationIssuesOnNgControl(modelGroup);
  }

  addDisplayedAddressLine(): void {
    const documentParty = this.documentParty;
    if (!documentParty) {
      return;
    }
    documentParty.displayedAddress ??= []
    documentParty.displayedAddress.push('');
  }

  removeIdentifyingCode(j: number, control: AbstractFormGroupDirective): void {
    this.documentParty!.party!.identifyingCodes!.splice(j, 1);
    clearValidationIssuesOnFormGroupDirective(control);
  }

  addIdentifyingCode(): void {
    const party = this.documentParty?.party;
    if (!party) {
      return;
    }
    party.identifyingCodes ??= []
    party.identifyingCodes.push(createIdentifyingCode());
  }

  addPartyContactDetails(): void {
    const party = this.documentParty?.party;
    if (!party) {
      return;
    }
    party.partyContactDetails ??= []
    party.partyContactDetails.push(createPartyContactDetails());
  }

  removePartyContactDetail(j: number, controlGroup: AbstractFormGroupDirective) {
    this.documentParty!.party!.partyContactDetails!.splice(j, 1);
    clearValidationIssuesOnFormGroupDirective(controlGroup);
  }
}
