import {
  ActiveReeferSettings,
  Commodity,
  DCSAResponsibleAgencyCode,
  DocumentParty,
  IdentifyingCode,
  PartyContactDetail,
  PartyFunction,
  RequestedEquipment,
  TemperatureUnit,
  WeightUnit
} from '../../../projects/bkg-swagger-client';
import {SelectItem} from 'primeng/api/selectitem';
import {BookingParty, BookingPartyOrReference, DocumentPartyReference, ShipperParty} from '../models/ndoc-party';


export function nullSelectItem<E>(): SelectItem<E|null> {
  return {
    label: "[unset]",
    value: null,
  }
}

export function createCommodity(): Commodity {
  return {
    HSCode: undefined,
    cargoGrossVolume: undefined,
    cargoGrossVolumeUnit: undefined,
    cargoGrossWeight: 0,
    cargoGrossWeightUnit: WeightUnit.KGM,
    commodityType: '',
    dangerousGoods: undefined,
    exportLicenseExpiryDate: undefined,
    exportLicenseIssueDate: undefined,
    numberOfPackages: undefined,
    requestedEquipments: undefined
  };
}

export function createRequestedEquipment(): RequestedEquipment {
  return {
    ISOEquipmentCode: '',
    activeReeferSettings: undefined,
    equipmentReferences: undefined,
    isShipperOwned: false,
    tareWeight: undefined,
    tareWeightUnit: undefined,
    units: 0
  }
}

export function createActiveReeferSettings(): ActiveReeferSettings {
  return {
    airExchangeSetpoint: undefined,
    airExchangeUnit: undefined,
    co2Setpoint: undefined,
    humiditySetpoint: undefined,
    isBulbMode: false,
    isColdTreatmentRequired: false,
    isDrainholesOpen: false,
    isGeneratorSetRequired: false,
    isHighValueCargo: false,
    isPreCoolingRequired: false,
    isVentilationOpen: false,
    o2Setpoint: undefined,
    temperatureSetpoint: 0,
    temperatureUnit: TemperatureUnit.CEL,
  };
}

export function createDocumentParty(): DocumentParty {
  return {
    isToBeNotified: false,
    party: {
      partyName: '',
      partyContactDetails: [
        createPartyContactDetails(),
      ],
    },
    partyFunction: PartyFunction.OS,

  }
}

export function createPartyContactDetails(): PartyContactDetail {
  return {
    name: '',
  }
}

export function createIdentifyingCode(): IdentifyingCode {
  return {
   DCSAResponsibleAgencyCode: DCSAResponsibleAgencyCode.SMDG,
   partyCode: '',
  }
}

export function createShipperParty(): ShipperParty {
  return {
    legalName: '',
    partyContactDetails: {
      name: '',
    },
    address: {

    },
    identifyingCodes: {

    },
    isToBeNotified: false
  };
}

export function createBookingParty(): BookingParty {
  return {
    legalName: '',
    address: {

    }
  };
}


export function createDocumentPartyReference(): DocumentPartyReference {
  return {
    carrierPartyReference: '',
  }
}
