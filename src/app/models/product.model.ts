export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  PrdimgURL: string;
  Material: string;
  categoryID: number;
  count: number;
}

export enum DiscountOffers {
  NoDiscount = 'No Discount',
  TenPercent = '10%',
  FifteenPercent = '15%'
}
