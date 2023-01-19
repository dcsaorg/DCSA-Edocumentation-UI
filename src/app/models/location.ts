import {Address, AddressName, LocationName, UNLocationCode} from '../../../projects/bkg-swagger-client';

export interface EdocAddress extends Address {
  name?: AddressName;
}

export interface EDocLocation {
  locationName?: LocationName;
  address?: EdocAddress;
  UNLocationCode?: UNLocationCode;
}
