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
import { Charge } from './charge';
import { ConfirmedEquipment } from './confirmedEquipment';
import { ShipmentCutOffTime } from './shipmentCutOffTime';
import { BookingResponse } from './bookingResponse';
import { Transport } from './transport';
import { CarrierClause } from './carrierClause';
import { ShipmentLocation } from './shipmentLocation';


/**
 * Shipment 
 */
export interface Shipment { 
    /**
     * A set of unique characters provided by carrier to identify a booking.
     */
    carrierBookingReference: string;
    /**
     * The date and time when the shipment was created (equivalent to when the Booking was confirmed). 
     */
    shipmentCreatedDateTime: string;
    /**
     * Last date and time when the Shipment was updated. 
     */
    shipmentUpdatedDateTime?: string;
    /**
     * Carrier general terms and conditions for the booking. 
     */
    termsAndConditions?: string;
    booking: BookingResponse;
    transports: Array<Transport>;
    shipmentCutOffTimes?: Array<ShipmentCutOffTime>;
    shipmentLocations?: Array<ShipmentLocation>;
    confirmedEquipments?: Array<ConfirmedEquipment>;
    charges?: Array<Charge>;
    carrierClauses?: Array<CarrierClause>;
}

