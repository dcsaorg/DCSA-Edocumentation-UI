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
import { BookingChannelReference } from './bookingChannelReference';
import { BookingShallowCore } from './bookingShallowCore';
import { CargoMovementTypeAtDestination } from './cargoMovementTypeAtDestination';
import { CargoMovementTypeAtOrigin } from './cargoMovementTypeAtOrigin';
import { CarrierExportVoyageNumber } from './carrierExportVoyageNumber';
import { CarrierServiceCode } from './carrierServiceCode';
import { CarrierServiceName } from './carrierServiceName';
import { CommunicationChannelCode } from './communicationChannelCode';
import { ContractQuotationReference } from './contractQuotationReference';
import { CustomsFilingSystem } from './customsFilingSystem';
import { DeclaredValue } from './declaredValue';
import { DeclaredValueCurrency } from './declaredValueCurrency';
import { DeliveryTypeAtDestination } from './deliveryTypeAtDestination';
import { ExpectedArrivalAtPlaceOfDeliveryEndDate } from './expectedArrivalAtPlaceOfDeliveryEndDate';
import { ExpectedArrivalAtPlaceOfDeliveryStartDate } from './expectedArrivalAtPlaceOfDeliveryStartDate';
import { ExpectedDepartureDate } from './expectedDepartureDate';
import { ExportDeclarationReference } from './exportDeclarationReference';
import { ImportLicenseReference } from './importLicenseReference';
import { IncoTerms } from './incoTerms';
import { IsCustomsFilingSubmissionByShipper } from './isCustomsFilingSubmissionByShipper';
import { IsEquipmentSubstitutionAllowed } from './isEquipmentSubstitutionAllowed';
import { IsExportDeclarationRequired } from './isExportDeclarationRequired';
import { IsImportLicenseRequired } from './isImportLicenseRequired';
import { IsPartialLoadAllowed } from './isPartialLoadAllowed';
import { ModeOfTransport } from './modeOfTransport';
import { PaymentTermCode } from './paymentTermCode';
import { ServiceContractReference } from './serviceContractReference';
import { TransportDocumentTypeCode } from './transportDocumentTypeCode';
import { UniversalExportVoyageReference } from './universalExportVoyageReference';
import { UniversalServiceReference } from './universalServiceReference';
import { VesselIMONumber } from './vesselIMONumber';
import { VesselName } from './vesselName';

/**
 * The shallow structure of the booking 
 */
export interface BookingShallow extends BookingShallowCore { 
    paymentTermCode?: PaymentTermCode;
    isPartialLoadAllowed: IsPartialLoadAllowed;
    isExportDeclarationRequired: IsExportDeclarationRequired;
    exportDeclarationReference?: ExportDeclarationReference;
    isImportLicenseRequired: IsImportLicenseRequired;
    importLicenseReference?: ImportLicenseReference;
    customsFilingSystems?: Array<CustomsFilingSystem>;
    isCustomsFilingSubmissionByShipper?: IsCustomsFilingSubmissionByShipper;
    contractQuotationReference?: ContractQuotationReference;
    expectedDepartureDate?: ExpectedDepartureDate;
    expectedArrivalAtPlaceOfDeliveryStartDate?: ExpectedArrivalAtPlaceOfDeliveryStartDate;
    expectedArrivalAtPlaceOfDeliveryEndDate?: ExpectedArrivalAtPlaceOfDeliveryEndDate;
    transportDocumentTypeCode?: TransportDocumentTypeCode;
    /**
     * A reference for a `TransportDocument` already provided by the shipping line to the Shipper. This field is to be used for prerequired transportDocumentReferences. 
     */
    transportDocumentReference?: any;
    bookingChannelReference?: BookingChannelReference;
    incoTerms?: IncoTerms;
    communicationChannelCode: CommunicationChannelCode;
    isEquipmentSubstitutionAllowed: IsEquipmentSubstitutionAllowed;
    vesselIMONumber?: VesselIMONumber;
    preCarriageModeOfTransportCode?: ModeOfTransport & any;
}