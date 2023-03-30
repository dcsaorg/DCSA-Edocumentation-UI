import {Component} from '@angular/core';
import {DocumentParty} from '../../../../projects/bkg-swagger-client';
import {NgModelGroup} from '@angular/forms';
import {clearValidationIssuesOnFormGroupDirective} from '../../util/validation-util';
import {createDocumentParty} from '../../util/object-factory';
import {BookingPartyOrReference, ShipperOrReference} from '../../models/ndoc-party';

interface DocumentPartyTable {
  originalShipper?: ShipperOrReference;
  shipperForwardingAgent?: ShipperOrReference;
  consignee?: ShipperOrReference;
  consigneeForwardingAgent?: ShipperOrReference;
  serviceContractOwner?: ShipperOrReference;

  firstNotifyParty?: ShipperOrReference;
  secondNotifyParty?: ShipperOrReference;
  otherNotifyParty?: ShipperOrReference;

  shipperInvoiceParty?: BookingPartyOrReference;
  consigneeInvoiceParty?: BookingPartyOrReference;
  bookingParty?: BookingPartyOrReference;
  carrierBookingOffice?: BookingPartyOrReference;
}

@Component({
  selector: 'app-document-party-demo',
  templateUrl: './document-party-demo.component.html',
  styleUrls: ['./document-party-demo.component.scss']
})
export class DocumentPartyDemoComponent {

  newDocumentParties: DocumentPartyTable = {};
  documentParties: DocumentParty[] = [];
  documentPartySelected: boolean[] = [];


  removeDocumentParty(i: number, modelGroup: NgModelGroup): void {
    this.documentParties.splice(i, 1);
    this.documentPartySelected.splice(i, 1);
    clearValidationIssuesOnFormGroupDirective(modelGroup);
  }

  addDocumentParty() {
    this.documentParties.push(createDocumentParty());
    this.documentPartySelected.push(true);
  }


}
