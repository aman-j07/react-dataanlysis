import React, { useRef, useState } from "react";
import { data } from "../types";

type TProps = {
  data: data[];
  countries: string[];
};

function CountryWiseProducts(props: TProps) {
  const { data, countries } = props;
  const [countryOrders, setCountryOrders] = useState<data[]>([]);
  const refCountry = useRef<HTMLSelectElement>(null);

  const generateCountryData = () => {
    let country = refCountry.current!.value;
    let temp: data[] = [];
    data.forEach((ele) => {
      if (ele.Country === country) {
        let ind =temp.findIndex(x => x.Description === ele.Description)
        if (ind > -1) {
          temp[ind].Quantity += ele.Quantity;
        }else {
          temp.push(ele);
        }
      }
    });
    setCountryOrders([...temp]);
  };

  return (
    <div className="card shadow rounded-2 p-4 mb-4">
      <form>
        <div className="mb-3">
          <label className="form-label">Select Country</label>
          <select ref={refCountry} className="form-select" onChange={generateCountryData}>
            {countries.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          {countryOrders.length > 0 && (
            <table className="table table-striped border mt-2">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Description</th>
                  <th>Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {countryOrders.map((ele) => {
                  return (
                    <tr><td>{ele.Description || 'dsg'}</td><td>{ele.Quantity || 46}</td></tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </form>
    </div>
  );
}

export default CountryWiseProducts;
