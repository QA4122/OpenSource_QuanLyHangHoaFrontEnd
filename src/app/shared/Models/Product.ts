export class Product{
    productCode: string;
  productName: string;
  amount: number;
  decription: string;
  unit: string;
  createDate: Date;
  price: number;
  saler: string;
  imageSource: string;
  warnAmount: number;
  hasCode: number;
  /**
   *
   */
  constructor() {
    this.productCode = '';
    this.productName = '';
    this.amount = 0;
    this.decription = '';
    this.unit = '';
    this.createDate = new Date();
    this.price = 0;
    this.saler = '';
    this.warnAmount = 0;
    this.hasCode = 0;
    }
}