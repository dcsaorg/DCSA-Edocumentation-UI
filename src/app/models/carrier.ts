import {PartyIdentifyingCodesInner} from '../../../projects/bkg-swagger-client';

export interface Carrier {
  partyName: string;
  identifyingCodes?: Array<PartyIdentifyingCodesInner>;
}
