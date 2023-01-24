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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { Booking } from '../model/booking';
// @ts-ignore
import { BookingDocumentStatus } from '../model/bookingDocumentStatus';
// @ts-ignore
import { BookingRefStatus } from '../model/bookingRefStatus';
// @ts-ignore
import { BookingResponse } from '../model/bookingResponse';
// @ts-ignore
import { BookingSummary } from '../model/bookingSummary';
// @ts-ignore
import { ModelError } from '../model/modelError';
// @ts-ignore
import { V2BookingsBody } from '../model/v2BookingsBody';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class BookingRequestService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Get booking requests
     * Retrieves the booking request _metadata_  If not specified - this list will be sorted by the time the &#x60;Booking Request&#x60; was created (bookingRequestCreatedDateTime) in ascending (ASC) order. 
     * @param documentStatus Filter by the status of the booking. Possible values are: - RECE (Received) - PENU (Pending Update) - PENC (Pending Confirmation) - CONF (Confirmed) - REJE (Rejected) - CANC (Cancelled) - CMPL (Completed)  More details can be found on &lt;a href&#x3D;\&quot;https://github.com/dcsaorg/DCSA-Information-Model/blob/master/datamodel/referencedata.d/shipmenteventtypecodes.csv\&quot;&gt;GitHub&lt;/a&gt;. Be aware that the list linked to is the &#x60;ShipmentEventTypeCodes&#x60; which is equivalent to &#x60;documentStatus&#x60;, the list is a subset of the possible values. 
     * @param limit Maximum number of items to return. 
     * @param sort A &#x60;,&#x60; (comma) separated list of field names to define the sort order. Field names should be suffixed by a &#x60;:&#x60; (colon) followed by either the keyword &#x60;ASC&#x60; (for ascending order) or &#x60;DESC&#x60; (for descening order) to specify direction. &#x60;:ASC&#x60; may be omitted, in which case ascending order will be used. 
     * @param aPIVersion An API-Version header **MAY** be added to the request (optional); if added it **MUST** only contain **MAJOR** version. API-Version header **MUST** be aligned with the URI version. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v2BookingSummariesGet(documentStatus?: BookingDocumentStatus, limit?: number, sort?: string, aPIVersion?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Array<BookingSummary>>;
    public v2BookingSummariesGet(documentStatus?: BookingDocumentStatus, limit?: number, sort?: string, aPIVersion?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Array<BookingSummary>>>;
    public v2BookingSummariesGet(documentStatus?: BookingDocumentStatus, limit?: number, sort?: string, aPIVersion?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Array<BookingSummary>>>;
    public v2BookingSummariesGet(documentStatus?: BookingDocumentStatus, limit?: number, sort?: string, aPIVersion?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (documentStatus !== undefined && documentStatus !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>documentStatus, 'documentStatus');
        }
        if (limit !== undefined && limit !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>limit, 'limit');
        }
        if (sort !== undefined && sort !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>sort, 'sort');
        }

        let localVarHeaders = this.defaultHeaders;
        if (aPIVersion !== undefined && aPIVersion !== null) {
            localVarHeaders = localVarHeaders.set('API-Version', String(aPIVersion));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v2/booking-summaries`;
        return this.httpClient.request<Array<BookingSummary>>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get booking requests
     * Retrieves the booking request with the &#x60;carrierBookingRequestReference&#x60; in the path. 
     * @param carrierBookingRequestReference The &#x60;carrierBookingRequestReference&#x60; of the booking request to match 
     * @param aPIVersion An API-Version header **MAY** be added to the request (optional); if added it **MUST** only contain **MAJOR** version. API-Version header **MUST** be aligned with the URI version. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v2BookingsCarrierBookingRequestReferenceGet(carrierBookingRequestReference: string, aPIVersion?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<BookingResponse>;
    public v2BookingsCarrierBookingRequestReferenceGet(carrierBookingRequestReference: string, aPIVersion?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<BookingResponse>>;
    public v2BookingsCarrierBookingRequestReferenceGet(carrierBookingRequestReference: string, aPIVersion?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<BookingResponse>>;
    public v2BookingsCarrierBookingRequestReferenceGet(carrierBookingRequestReference: string, aPIVersion?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (carrierBookingRequestReference === null || carrierBookingRequestReference === undefined) {
            throw new Error('Required parameter carrierBookingRequestReference was null or undefined when calling v2BookingsCarrierBookingRequestReferenceGet.');
        }

        let localVarHeaders = this.defaultHeaders;
        if (aPIVersion !== undefined && aPIVersion !== null) {
            localVarHeaders = localVarHeaders.set('API-Version', String(aPIVersion));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v2/bookings/${this.configuration.encodeParam({name: "carrierBookingRequestReference", value: carrierBookingRequestReference, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<BookingResponse>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Put booking requests
     * Updates the booking request with the &#x60;carrierBookingRequestReference&#x60; in the path. 
     * @param carrierBookingRequestReference The &#x60;carrierBookingRequestReference&#x60; of the booking request to match 
     * @param booking Parameters used to update the booking request
     * @param aPIVersion An API-Version header **MAY** be added to the request (optional); if added it **MUST** only contain **MAJOR** version. API-Version header **MUST** be aligned with the URI version. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v2BookingsCarrierBookingRequestReferencePut(carrierBookingRequestReference: string, booking: Booking, aPIVersion?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<BookingRefStatus>;
    public v2BookingsCarrierBookingRequestReferencePut(carrierBookingRequestReference: string, booking: Booking, aPIVersion?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<BookingRefStatus>>;
    public v2BookingsCarrierBookingRequestReferencePut(carrierBookingRequestReference: string, booking: Booking, aPIVersion?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<BookingRefStatus>>;
    public v2BookingsCarrierBookingRequestReferencePut(carrierBookingRequestReference: string, booking: Booking, aPIVersion?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (carrierBookingRequestReference === null || carrierBookingRequestReference === undefined) {
            throw new Error('Required parameter carrierBookingRequestReference was null or undefined when calling v2BookingsCarrierBookingRequestReferencePut.');
        }
        if (booking === null || booking === undefined) {
            throw new Error('Required parameter booking was null or undefined when calling v2BookingsCarrierBookingRequestReferencePut.');
        }

        let localVarHeaders = this.defaultHeaders;
        if (aPIVersion !== undefined && aPIVersion !== null) {
            localVarHeaders = localVarHeaders.set('API-Version', String(aPIVersion));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v2/bookings/${this.configuration.encodeParam({name: "carrierBookingRequestReference", value: carrierBookingRequestReference, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<BookingRefStatus>('put', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: booking,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Post a booking request
     * Creates a new booking request 
     * @param v2BookingsBody Parameters used to create a booking request
     * @param aPIVersion An API-Version header **MAY** be added to the request (optional); if added it **MUST** only contain **MAJOR** version. API-Version header **MUST** be aligned with the URI version. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v2BookingsPost(v2BookingsBody: V2BookingsBody, aPIVersion?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<BookingRefStatus>;
    public v2BookingsPost(v2BookingsBody: V2BookingsBody, aPIVersion?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<BookingRefStatus>>;
    public v2BookingsPost(v2BookingsBody: V2BookingsBody, aPIVersion?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<BookingRefStatus>>;
    public v2BookingsPost(v2BookingsBody: V2BookingsBody, aPIVersion?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (v2BookingsBody === null || v2BookingsBody === undefined) {
            throw new Error('Required parameter v2BookingsBody was null or undefined when calling v2BookingsPost.');
        }

        let localVarHeaders = this.defaultHeaders;
        if (aPIVersion !== undefined && aPIVersion !== null) {
            localVarHeaders = localVarHeaders.set('API-Version', String(aPIVersion));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v2/bookings`;
        return this.httpClient.request<BookingRefStatus>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: v2BookingsBody,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
