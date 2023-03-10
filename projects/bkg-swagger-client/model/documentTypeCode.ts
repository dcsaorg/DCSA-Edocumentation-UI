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


/**
 * The `documentTypeCode` is used to identify the type of information `documentReference` points to. Can be one of the following values - CBR (Carrier Booking Request) - BKG (Booking) - SHI (Shipping Instruction) - TRD (Transport Document) - DEI (Delivery Instructions) - DEO (Delivery Order) - TRO (Transport Order) - CRO (Container Release Order) - ARN (Arrival Notice) - VGM (Verified Gross Mass) - CAS (Cargo Survey) - CUC (Customs Clearance) - DGD (Dangerous Goods Declaration) - OOG (Out of Gauge) - CQU (Contract Quotation) - INV (Invoice) - HCE (Health Certificate) - PCE (Phytosanitary Certificate) - VCE (Veterinary Certificate) - FCE (Fumigation Certificate) - ICE (Inspection Certificate) - CEA (Certificate of Analysis) - CEO (Certificate of Origin)  More details can be found on [GitHub](https://github.com/dcsaorg/DCSA-Information-Model/blob/master/datamodel/referencedata.d/documenttypecodes.csv) 
 */
export enum DocumentTypeCode {
    CBR = 'CBR',
    BKG = 'BKG',
    SHI = 'SHI',
    TRD = 'TRD',
    DEI = 'DEI',
    DEO = 'DEO',
    TRO = 'TRO',
    CRO = 'CRO',
    ARN = 'ARN',
    VGM = 'VGM',
    CAS = 'CAS',
    CUC = 'CUC',
    DGD = 'DGD',
    OOG = 'OOG',
    CQU = 'CQU',
    INV = 'INV',
    HCE = 'HCE',
    PCE = 'PCE',
    VCE = 'VCE',
    FCE = 'FCE',
    ICE = 'ICE',
    CEA = 'CEA',
    CEO = 'CEO'
}

