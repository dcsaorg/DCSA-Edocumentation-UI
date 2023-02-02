import {Commodity, RequestedEquipment, WeightUnit} from '../../../projects/bkg-swagger-client';

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
    tareWeight: 0,
    tareWeightUnit: undefined,
    units: 0
  }
}
