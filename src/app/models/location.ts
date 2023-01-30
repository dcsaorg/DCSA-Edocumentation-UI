import {Address, FacilityCodeListProvider} from '../../../projects/bkg-swagger-client';

export interface EDocLocation {
  locationName?: string;
  address?: Address;
  UNLocationCode?: string;

  /**
   * The code used for identifying the specific facility. This code does <b>not</b> include the UN Location Code.
   */
  facilityCode?: string;
  facilityCodeListProvider?: FacilityCodeListProvider;
}
