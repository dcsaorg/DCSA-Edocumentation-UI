export interface EdocAddress {
  name: string|null|undefined;
  street: string|null|undefined;
  streetNumber: string|null|undefined;
  floor: string|null|undefined;
  postCode: string|null|undefined;
  city: string|null|undefined;
  stateRegion: string|null|undefined;
  country: string|null|undefined;
}

export interface EDocLocation {
  locationName: string|null|undefined;
  address: EdocAddress|null|undefined;
  UNLocationCode: string|null|undefined;
}
