import {Party} from '../../../projects/bkg-swagger-client';

export interface IssueTDDraftRequest {
  shippingInstructionReference: string;
  shippedOnBoardDate?: Date;
  receivedForShipmentDate?: Date;
  issuingParty: Party;
}
