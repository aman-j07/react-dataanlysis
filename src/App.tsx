import React, { useEffect,useState } from "react";
import "./App.css";
import CountryWiseProducts from "./components/CountryWiseProducts";
import Invoice from "./components/Invoice";
import Products from "./components/Products";
import { data, selectData } from "./types";

function App() {
  const [data, setData] = useState<data[]>([]);
  const [loading,setLoading]=useState<boolean>(false)
  const [selectData, setSelectData] = useState<selectData>({
    custIds: [],
    products: [],
    countries: [],
  });

  useEffect(()=>{
    setLoading(true)
    fetch( './sampledata.csv' )
    .then( response => response.text() )
    .then( responseText => {
        convertToReadable(responseText)
        setLoading(false)
    })
  },[])

  const convertToReadable = (data: string) => {
    const keys = data.slice(0, data.indexOf("\r\n")).split(",");
    const values = data.slice(data.indexOf("\r\n")+1).split("\r\n");
    let valArrs = values.map((ele) => {
      let obj: data = {
        InvoiceNo: "",
        StockCode: "",
        Description: "",
        Quantity: "",
        InvoiceDate: "",
        UnitPrice: "",
        CustomerID: "",
        Country: "",
      };
      ele.split(",").forEach((item, i) => {
        if (
          keys[i] === "CustomerID" &&
          selectData.custIds.indexOf(item) === -1 &&
          String(parseInt(item)).length === 5
        ) {
          selectData.custIds.push(item.slice(0,-2));
        }
        if (
          keys[i] === "Description" &&
          selectData.products.indexOf(item) === -1
        ) {
          selectData.products.push(item);
        }
        if (
          keys[i] === "Country" &&
          selectData.countries.indexOf(item) === -1 &&
          item.match(/^[A-Za-z]+$/)
        ) {
          selectData.countries.push(item);
        }
        Object.assign(obj, { [keys[i]]: item });
      });
      return obj;
    });
    setData(valArrs);
    setSelectData({ ...selectData });
  };

  console.log(data);
  console.log(selectData);

  return (
    <div className="App p-4">
      {loading?<span className="d-flex align-items-center gap-1 justify-content-center">Loading <img className="loader" src='https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif' alt='loader'/></span>:
      <><Invoice data={data} custIds={selectData.custIds} />
      <Products data={data} products={selectData.products} />
      <CountryWiseProducts data={data} countries={selectData.countries} /></>}
    </div>
  );
}

export default App;
