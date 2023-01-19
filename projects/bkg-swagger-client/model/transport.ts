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
import { CarrierExportVoyageNumber } from './carrierExportVoyageNumber';
import { CarrierImportVoyageNumber } from './carrierImportVoyageNumber';
import { IsUnderShippersResponsibility } from './isUnderShippersResponsibility';
import { ModeOfTransport } from './modeOfTransport';
import { PlannedArrivalDate } from './plannedArrivalDate';
import { PlannedDepartureDate } from './plannedDepartureDate';
import { TransportPlanStageSequenceNumber } from './transportPlanStageSequenceNumber';
import { UniversalExportVoyageReference } from './universalExportVoyageReference';
import { UniversalImportVoyageReference } from './universalImportVoyageReference';
import { VesselIMONumber } from './vesselIMONumber';
import { VesselName } from './vesselName';

/**
 * A list of transports sorted by ShipmentTransport sequenceNumber
 */
export interface Transport { 
    transportPlanStageSequenceNumber: TransportPlanStageSequenceNumber;
    /**
     * General purpose object to capture the `Load Location`. The location can be specified in **any** of the following ways: `UN Location Code`, `Facility` and/or an `Address`. 
     */
    loadLocation: any;
    /**
     * General purpose object to capture the `Discharge Location`. The location can be specified in **any** of the following ways: `UN Location Code`, `Facility` and/or an `Address`. 
     */
    dischargeLocation: any;
    plannedDepartureDate: PlannedDepartureDate;
    plannedArrivalDate: PlannedArrivalDate;
    modeOfTransport?: ModeOfTransport;
    vesselName?: VesselName;
    vesselIMONumber?: VesselIMONumber;
    carrierImportVoyageNumber?: CarrierImportVoyageNumber;
    universalImportVoyageReference?: UniversalImportVoyageReference;
    carrierExportVoyageNumber?: CarrierExportVoyageNumber;
    universalExportVoyageReference?: UniversalExportVoyageReference;
    isUnderShippersResponsibility?: IsUnderShippersResponsibility;
}