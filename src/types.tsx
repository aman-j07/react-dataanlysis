export type data = {
  InvoiceNo: number;
  StockCode: string;
  Description: string;
  Quantity: number;
  InvoiceDate: string;
  UnitPrice: number;
  CustomerID: number;
  Country: string;
};

export type order = {
  Description: string;
  Quantity: number;
  InvoiceDate: string;
  UnitPrice: number;
  Total: string;
};

export type billItems={
  items:order[],
  gTotal:number
}

export type prodDetails = {
  Description: string;
  OrderCount: number;
  TotalQuantity: number;
};

export type selectData={
    custIds:number[];
    products:string[];
    countries:string[];
}