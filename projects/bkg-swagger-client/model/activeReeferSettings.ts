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
import { TemperatureUnit } from './temperatureUnit';
import { AirExchangeUnit } from './airExchangeUnit';


/**
 * The specifications for a Reefer equipment. If this object is provided then the equipment linked to this Reefer object should be concidered an **Operated Reefer**.  If not provided the equipment should be concidered a **Non Operated Reefer** in case the `ISOEquipmentCode` indicates a reefer container.
 */
export interface ActiveReeferSettings {
    /**
     * Indicator whether reefer container should have a generator set attached at time of release from depot
     */
    isGeneratorSetRequired: boolean;
    /**
     * Indicator whether reefer container should be pre-cooled to the temperature setting required at time of release from depot
     */
    isPreCoolingRequired: boolean;
    /**
     * Indicator whether cargo requires cold treatment prior to loading at origin or during transit, but prior arrival at POD
     */
    isColdTreatmentRequired: boolean;
    /**
     * If `true` the ventilation orifice is `Open` - if `false` the ventilation orifice is `closed`
     */
    isVentilationOpen: boolean;
    /**
     * Is drainholes open on the container
     */
    isDrainholesOpen: boolean;
    /**
     * Is special container setting for handling flower bulbs active
     */
    isBulbMode: boolean;
    /**
     * Cargo value exceeds USD XXX K (carrier specific)
     */
    isHighValueCargo: boolean;
    /**
     * Target value of the temperature for the Reefer based on the cargo requirement.
     */
    temperatureSetpoint: number;
    temperatureUnit: TemperatureUnit;
    /**
     * The percentage of the controlled atmosphere O<sub>2</sub> target value
     */
    o2Setpoint?: number;
    /**
     * The percentage of the controlled atmosphere CO<sub>2</sub> target value
     */
    co2Setpoint?: number;
    /**
     * The percentage of the controlled atmosphere nitrogen target value
     */
    nitrogenSetpoint?: number;
    /**
     * The percentage of the controlled atmosphere humidity target value
     */
    humiditySetpoint?: number;
    /**
     * Target value for the air exchange rate which is the rate at which outdoor air replaces indoor air within a Reefer container
     */
    airExchangeSetpoint?: number;
    airExchangeUnit?: AirExchangeUnit;
}

