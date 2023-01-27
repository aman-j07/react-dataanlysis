import React, { useRef, useState } from "react";
import "./App.css";
import CountryWiseProducts from "./components/CountryWiseProducts";
import Invoice from "./components/Invoice";
import Products from "./components/Products";
import { data, selectData} from "./types";

function App() {
  const refFile = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<data[]>([]);
  const [selectData,setSelectData]=useState<selectData>({custIds:[],products:[],countries:[]})

  const convertToReadable = (data: string) => {
    const keys = data.slice(0, data.indexOf("\n")).split(",");
    const values = data.slice(data.indexOf("\n")).split("\n");
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
          selectData.custIds.push(item);
        }
        if (keys[i] === "Description" && selectData.products.indexOf(item) === -1) {
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
    setSelectData({...selectData})
  };

  const readFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      let text = e.target?.result;
      convertToReadable(text!.toString());
    };
    fileReader.readAsText(refFile.current!.files![0]);
  };

  return (
    <div className="App px-4">
      <form
        className="border d-inline-block p-4 my-4"
        onSubmit={(e) => {
          readFile(e);
        }}
      >
        <div className="mb-3">
          <label className="form-label">Select CSV file</label>
          <input
            type="file"
            accept=".csv"
            ref={refFile}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <Invoice data={data} custIds={selectData.custIds} />
      <Products data={data} products={selectData.products} />
      <CountryWiseProducts data={data} countries={selectData.countries}/>
    </div>
  );
}

export default App;
