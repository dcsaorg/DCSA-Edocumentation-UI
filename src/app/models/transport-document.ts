import {ShippingInstruction} from './shipping-instruction';

export interface TransportDocument {
  transportDocumentReference: string;
  shippingInstruction: ShippingInstruction;
}

export interface TransportDocumentChangeResponse {
  transportDocumentReference: string;
  documentStatus: string;
}
