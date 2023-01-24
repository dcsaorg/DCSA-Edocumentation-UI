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


export interface DetailedError { 
    /**
     * Standard error code see http://dcsa.org/error-codes (to be created). Examples: 7003 – out or range value, 7004 -  invalid type 
     */
    errorCode?: number;
    /**
     * The field that caused the error, e.g. a failed validation. The field can be expressed as a [JSONpath](https://github.com/json-path/JsonPath) 
     */
    field?: string;
    /**
     * The value that of the field that caused the error 
     */
    value?: string;
    /**
     * High level error message 
     */
    reason: string;
    /**
     * Additional information as to why the error occured 
     */
    message: string;
}

