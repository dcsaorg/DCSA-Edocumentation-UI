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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BookingsCarrierBookingRequestReferenceBody } from '../model/bookingsCarrierBookingRequestReferenceBody';
import { CarrierBookingRequestReference } from '../model/carrierBookingRequestReference';
import { InlineResponse200 } from '../model/inlineResponse200';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CancellationService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Cancel a booking
     * A shipper initiated cancellation of the Booking. 
     * @param carrierBookingRequestReference The &#x60;carrierBookingRequestReference&#x60; of the booking request to match 
     * @param body 
     * @param aPIVersion An API-Version header **MAY** be added to the request (optional); if added it **MUST** only contain **MAJOR** version. API-Version header **MUST** be aligned with the URI version. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v1BookingsCarrierBookingRequestReferencePatch(carrierBookingRequestReference: CarrierBookingRequestReference, body?: BookingsCarrierBookingRequestReferenceBody, aPIVersion?: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public v1BookingsCarrierBookingRequestReferencePatch(carrierBookingRequestReference: CarrierBookingRequestReference, body?: BookingsCarrierBookingRequestReferenceBody, aPIVersion?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public v1BookingsCarrierBookingRequestReferencePatch(carrierBookingRequestReference: CarrierBookingRequestReference, body?: BookingsCarrierBookingRequestReferenceBody, aPIVersion?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public v1BookingsCarrierBookingRequestReferencePatch(carrierBookingRequestReference: CarrierBookingRequestReference, body?: BookingsCarrierBookingRequestReferenceBody, aPIVersion?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (carrierBookingRequestReference === null || carrierBookingRequestReference === undefined) {
            throw new Error('Required parameter carrierBookingRequestReference was null or undefined when calling v1BookingsCarrierBookingRequestReferencePatch.');
        }



        let headers = this.defaultHeaders;
        if (aPIVersion !== undefined && aPIVersion !== null) {
            headers = headers.set('API-Version', String(aPIVersion));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<InlineResponse200>('patch',`${this.basePath}/v1/bookings/${encodeURIComponent(String(carrierBookingRequestReference))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}