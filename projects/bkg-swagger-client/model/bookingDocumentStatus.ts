/**
 * DCSA OpenAPI specification for Booking v2 - Beta 1
 * API specification issued by DCSA.org.  For explanation to specific values or objects please refer to the *** [Information Model v2022.1]() *** Will be updated soon ***. This API does not define the business rules regarding what is allowed to update at what time. For this the [BKG IFS]() *** Will be updated soon *** should be consulted.  All other documents related to the Booking publication can be found [here](https://knowledge.dcsa.org/s/publication?publicationId=a0r7T000000L8mmQAC)  It is possible to use this API as a standalone API. In order to do so it is necessary to use the poll-endPoint - /v2/events  in order to poll event information.  It is recomended to implement the [DCSA Documentation Event Hub](https://app.swaggerhub.com/apis/dcsaorg/DOCUMENTATION_EVENT_HUB) in order to use the push model. Here events are pushed as they occur.  For a changelog please click [here](https://github.com/dcsaorg/DCSA-OpenAPI/tree/master/bkg/v2#v200B1). Please also [create a GitHub issue](https://github.com/dcsaorg/DCSA-OpenAPI/issues/new) if you have any questions/comments. 
 *
 * OpenAPI spec version: 2.0.0-Beta-1
 * Contact: info@dcsa.org
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * The status of the booking. Possible values are: - RECE (Received) - PENU (Pending Update) - PENC (Pending Confirmation) - CONF (Confirmed) - REJE (Rejected) - CANC (Cancelled) - CMPL (Completed)  More details can be found on <a href=\"https://github.com/dcsaorg/DCSA-Information-Model/blob/master/datamodel/referencedata.d/shipmenteventtypecodes.csv\">GitHub</a>. Be aware that the list linked to is the `ShipmentEventTypeCodes` which is equivalent to `documentStatus`, the list is a subset of the possible values. 
 */
export type BookingDocumentStatus = 'RECE' | 'PENU' | 'PENC' | 'CONF' | 'REJE' | 'CANC' | 'CMPL';

export const BookingDocumentStatus = {
    RECE: 'RECE' as BookingDocumentStatus,
    PENU: 'PENU' as BookingDocumentStatus,
    PENC: 'PENC' as BookingDocumentStatus,
    CONF: 'CONF' as BookingDocumentStatus,
    REJE: 'REJE' as BookingDocumentStatus,
    CANC: 'CANC' as BookingDocumentStatus,
    CMPL: 'CMPL' as BookingDocumentStatus
};