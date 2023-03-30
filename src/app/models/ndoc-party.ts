import {Address, PartyContactDetail} from '../../../projects/bkg-swagger-client';

export interface ShipperParty {
  legalName: string;
  address: Address;
  displayedAddress?: string[];
  partyContactDetails: PartyContactDetail;
  identifyingCodes?: {
    carrierPartyReference?: string;
    leiCode?: string;
    eblPlatformIdentifier?: string;
    taxReferences?: string[];
  }
  isToBeNotified?: boolean;
}

export interface BookingParty {
  legalName: string;
  address: Address;
  displayedAddress?: string[];
}

export interface DocumentPartyReference {
  carrierPartyReference: string;
}

export interface BookingPartyChoice extends DocumentPartyReference {
  partyName: string;
  leiCode?: string;
  city?: string;
  country?: string;
}

export type ShipperOrReference = ShipperParty | DocumentPartyReference;
export type BookingPartyOrReference = BookingParty | DocumentPartyReference;
