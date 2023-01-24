/**
 * DCSA OpenAPI specification for Booking v2 - Beta 1
 * API specification issued by DCSA.org.  For explanation to specific values or objects please refer to the *** [Information Model v2022.1]() *** Will be updated soon ***. This API does not define the business rules regarding what is allowed to update at what time. For this the [BKG IFS]() *** Will be updated soon *** should be consulted.  All other documents related to the Booking publication can be found [here](https://knowledge.dcsa.org/s/publication?publicationId=a0r7T000000L8mmQAC)  It is possible to use this API as a standalone API. In order to do so it is necessary to use the poll-endPoint - /v2/events  in order to poll event information.  It is recomended to implement the [DCSA Documentation Event Hub](https://app.swaggerhub.com/apis/dcsaorg/DOCUMENTATION_EVENT_HUB) in order to use the push model. Here events are pushed as they occur.  For a changelog please click [here](https://github.com/dcsaorg/DCSA-OpenAPI/tree/master/bkg/v2#v200B1). Please also [create a GitHub issue](https://github.com/dcsaorg/DCSA-OpenAPI/issues/new) if you have any questions/comments. 
 *
 * The version of the OpenAPI document: 2.0.0-Beta-1
 * Contact: info@dcsa.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PaymentTermCode } from './paymentTermCode';


/**
 * addresses the monetary value of freight and other service charges for a transport document. 
 */
export interface Charge { 
    /**
     * Free text field describing the charge type to apply 
     */
    chargeType: string;
    /**
     * The monetary value of all freight and other service charges for a transport document, with a maximum of 2-digit decimals.
     */
    currencyAmount: number;
    /**
     * The currency for the charge, using a 3-character code (ISO 4217).
     */
    currencyCode: string;
    paymentTermCode: PaymentTermCode;
    /**
     * The code specifying the measure unit used for the corresponding unit price for this cost, such as per day, per ton, per square metre.
     */
    calculationBasis: string;
    /**
     * The unit price of this charge item in the currency of the charge.
     */
    unitPrice: number;
    /**
     * The amount of unit for this charge item.
     */
    quantity: number;
}

