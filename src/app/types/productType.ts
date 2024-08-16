export interface IProduct {
  Manufacturer: string;
  ManufacturerID: number;
  Model: string;
  ModelID: number;
  FullName: string;
  FullNameURLFriendly: string;
  ManufacturerNameURLFriendly: string;
  ImageName: string;
  ImageExtension: string
  ImageURL: string
  CashValue: string,
  ProductClass: string,
  ProductClassNo: number,
  IMEIType: string,
  SKU: null,
  CustomerModelID: null,
  Offer: boolean,
  OfferValue: null,
  PromoCode: null
}

export interface IBrand {
  name: string,
  image: string,
}