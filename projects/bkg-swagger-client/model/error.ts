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
import { DetailedError } from './detailedError';

export interface Error { 
    /**
     * The http request method type e.g. GET, POST 
     */
    httpMethod: Error.HttpMethodEnum;
    /**
     * The request URI as it was sent 
     */
    requestUri: string;
    /**
     * The HTTP status code 
     */
    statusCode: number;
    /**
     * The textual representation of the status code 
     */
    statusCodeText: string;
    /**
     * Other error information 
     */
    errorMessage?: string;
    /**
     * A unique identifier for the transaction, e.g. a UUID 
     */
    providerCorrelationID?: string;
    /**
     * The date and time (in ISO 8601 format) the error occurred. 
     */
    errorDateTime: Date;
    /**
     * List of detailed errors, e.g. fields that could not pass validation 
     */
    errors: Array<DetailedError>;
}
export namespace Error {
    export type HttpMethodEnum = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'PATCH';
    export const HttpMethodEnum = {
        GET: 'GET' as HttpMethodEnum,
        HEAD: 'HEAD' as HttpMethodEnum,
        POST: 'POST' as HttpMethodEnum,
        PUT: 'PUT' as HttpMethodEnum,
        DELETE: 'DELETE' as HttpMethodEnum,
        OPTION: 'OPTION' as HttpMethodEnum,
        PATCH: 'PATCH' as HttpMethodEnum
    };
}