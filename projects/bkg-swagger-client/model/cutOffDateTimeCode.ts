/**
 * DCSA OpenAPI specification for Booking v2 - Beta 1
 * API specification issued by DCSA.org.  For explanation to specific values or objects please refer to the *** [Information Model v2022.1]() *** Will be updated soon ***. This API does not define the business rules regarding what is allowed to update at what time. For this the [BKG IFS]() *** Will be updated soon *** should be consulted.  All other documents related to the Booking publication can be found [here](https://knowledge.dcsa.org/s/publication?publicationId=a0r7T000000L8mmQAC)  It is possible to use this API as a standalone API. In order to do so it is necessary to use the poll-endPoint - /v1/events  in order to poll event information.  It is recomended to implement the [DCSA Documentation Event Hub](https://app.swaggerhub.com/apis/dcsaorg/DOCUMENTATION_EVENT_HUB) in order to use the push model. Here events are pushed as they occur.  For a changelog please click [here](https://github.com/dcsaorg/DCSA-OpenAPI/tree/master/bkg/v1#v200B1). Please also [create a GitHub issue](https://github.com/dcsaorg/DCSA-OpenAPI/issues/new) if you have any questions/comments. 
 *
 * OpenAPI spec version: 2.0.0-Beta-1
 * Contact: info@dcsa.org
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Code for the cut-off time - DCO (Documentation cut-off) - VCO (VGM cut-off) - FCO (FCL delivery cut-off) - LCO (LCL delivery cut-off) - ECP (Empty container pick-up date and time) - EFC (Earliest full-container delivery date) - AFD (AMS Filing Due date) 
 */
export type CutOffDateTimeCode = 'DCO' | 'VCO' | 'FCO' | 'LCO' | 'ECP' | 'EFC' | 'AFD';

export const CutOffDateTimeCode = {
    DCO: 'DCO' as CutOffDateTimeCode,
    VCO: 'VCO' as CutOffDateTimeCode,
    FCO: 'FCO' as CutOffDateTimeCode,
    LCO: 'LCO' as CutOffDateTimeCode,
    ECP: 'ECP' as CutOffDateTimeCode,
    EFC: 'EFC' as CutOffDateTimeCode,
    AFD: 'AFD' as CutOffDateTimeCode
};