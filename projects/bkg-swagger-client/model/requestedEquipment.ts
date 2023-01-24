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
import { WeightUnit } from './weightUnit';
import { ActiveReeferSettings } from './activeReeferSettings';


/**
 * The requested equipments for the booking. If needed - it is **only** possible to specify a single Reefer setting. If multiple settings are required for the same `equipmentSizeType` then multiple `requestedEquipment` should be specified (one for each Reefer setting). 
 */
export interface RequestedEquipment { 
    ISOEquipmentCode: string;
    tareWeight?: number;
    tareWeightUnit?: WeightUnit;
    /**
     * Number of requested equipment units. The number can represent a fraction of a container in case the same container type will be used by multiple commodities. 
     */
    units: number;
    /**
     * A list of equipments to be used by the shipper if known at the time of booking 
     */
    equipmentReferences?: Array<string>;
    /**
     * Indicates whether the container is shipper owned (SOC).
     */
    isShipperOwned: boolean;
    activeReeferSettings?: ActiveReeferSettings;
}

