export type data = {
  InvoiceNo: string;
  StockCode: string;
  Description: string;
  Quantity: string;
  InvoiceDate: string;
  UnitPrice: string;
  CustomerID: string;
  Country: string;
};

export type order = {
  Description: string;
  Quantity: string;
  InvoiceDate: string;
  UnitPrice: string;
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
    custIds:string[];
    products:string[];
    countries:string[];
}