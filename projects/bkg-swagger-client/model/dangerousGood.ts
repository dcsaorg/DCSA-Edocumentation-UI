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
import { DgPacking } from './dgPacking';
import { InhalationZone } from './inhalationZone';
import { Fumigation } from './fumigation';
import { CargoNetWeightUnit } from './cargoNetWeightUnit';
import { TemperatureUnit } from './temperatureUnit';
import { DgContactDetails } from './dgContactDetails';
import { CargoNetExplosiveNecContentUnit } from './cargoNetExplosiveNecContentUnit';


/**
 * Specification for Dangerous Goods 
 */
export interface DangerousGood { 
    /**
     * The CVL assist to remove ambiguities when identifying a variant within a single UN number that may occur when two companies exchange DG information. 
     */
    codedVariantList?: string;
    /**
     * Indicates if the goods belong to the classification of Marine Pollutant. 
     */
    isMarinePollutants?: boolean;
    /**
     * Indicates if the quantity per inner and outer packing for transporting dangerous good as maximum quantity as limited quantity in accordance with Chapter 3.4. 
     */
    isLimitedQuantity?: boolean;
    /**
     * Alpha-numeric code for indicating the maximum quantity per inner and outer packing for transporting dangerous good as excepted quantities as per Chapter 3.5. 
     */
    isExceptedQuantity?: boolean;
    /**
     * Indicates if the cargo require approval from authorities 
     */
    isSalvagePackings?: boolean;
    /**
     * Indicates if the cargo is residue 
     */
    isUncleanedResidue?: boolean;
    /**
     * Indicates if waste is being shipped 
     */
    isWaste?: boolean;
    /**
     * Indicates if high temperatures cargo is shipped. 
     */
    isHot?: boolean;
    /**
     * Indicates if the cargo require approval from authorities 
     */
    isCompetentAuthorityApproval?: boolean;
    segregationGroups?: Array<string>;
    /**
     * Total weight of the goods carried, excluding packaging. 
     */
    cargoNetWeight?: number;
    cargoNetWeightUnit?: CargoNetWeightUnit;
    /**
     * Net Explosive Weight is the total weight of the explosive substances. 
     */
    cargoNetExplosiveNecContent?: number;
    cargoNetExplosiveNecContentUnit?: CargoNetExplosiveNecContentUnit;
    outerPacking?: DgPacking;
    innerPacking?: DgPacking;
    /**
     * Lowest temperature of a liquid at which its vapour forms an ignitable mixture with air. 
     */
    flashPoint?: number;
    flashPointUnit?: TemperatureUnit;
    /**
     * Maximum temperature at which certain substance (such as organic peroxides and self-reactive and related substances) can be safely transported for a prolonged period. 
     */
    controlTemperature?: number;
    controlTemperatureUnit?: TemperatureUnit;
    /**
     * Temperature at which emergency procedures shall be implemented 
     */
    emergencyTemperature?: number;
    emergencyTemperatureUnit?: TemperatureUnit;
    /**
     * Lowest temperature in which self-accelerating decomposition may occur in a substance 
     */
    sadt?: number;
    sadtUnit?: TemperatureUnit;
    /**
     * Lowest temperature in which self-accelerating polymerization may occur in a substance 
     */
    sapt?: number;
    saptUnit?: TemperatureUnit;
    dgContactDetails?: DgContactDetails;
    /**
     * Date by when the refrigerated liquid needs to be delivered. 
     */
    endOfHoldingDateTime?: string;
    fumigation?: Fumigation;
    /**
     * The threshold quantity that triggers the requirement to report a spill. 
     */
    isReportableQuantity?: boolean;
    inhalationZone?: InhalationZone;
    /**
     * Indicate if the container was inpsected 
     */
    isInspected?: boolean;
    /**
     * Name of the person/company that perform the inspection 
     */
    inspectionIdentifier?: string;
    /**
     * Text field to indicate certificate number & segment for specific stowage requirments overulling IMDG code 
     */
    specialCertificateNumber?: string;
    /**
     * Text field to provide cargo handling information already known at the booking stage. 
     */
    additionalCargoHandlingInformation?: string;
}

