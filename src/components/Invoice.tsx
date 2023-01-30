import React, { useRef, useState } from "react";
import { billItems, data, order } from "../types";
type TProps = {
  data: data[];
  custIds: string[];
};
function Invoice(props: TProps) {
  const { data, custIds } = props;
  const refCustId = useRef<HTMLSelectElement>(null);
  const [billItems, setBillItems] = useState<billItems>();

  const generateBill = () => {
    let id = refCustId.current!.value;
    let temp: order[] = [];
    let gtotal=0;
    data.forEach((ele) => {
      if (ele.CustomerID === id) {
        let obj = {
          Description: ele.Description,
          Quantity: ele.Quantity,
          InvoiceDate: ele.InvoiceDate,
          UnitPrice: ele.UnitPrice,
          Total: (parseFloat(ele.UnitPrice) * parseInt(ele.Quantity)).toFixed(
            2
          ),
        };
        temp.push(obj);
        gtotal+=parseFloat(ele.UnitPrice) * parseInt(ele.Quantity)
      }
    });
    gtotal=parseFloat((gtotal).toFixed(2))
    setBillItems({items:temp,gTotal:gtotal})
  };

  return (
    <div className="card shadow rounded-2 p-4 mb-4">
      <form>
        <div className="mb-3">
          <label className="form-label">Select Customer ID</label>
          <select
            ref={refCustId}
            className="form-select"
            onChange={generateBill}
          >
            {custIds.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          {billItems!==undefined && (
            <table className="table table-striped border mt-2">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Description</th>
                  <th>InvoiceDate</th>
                  <th>UnitPrice</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {billItems!.items.map((ele) => {
                  return (
                    <tr>
                      <td>{ele.Description}</td>
                      <td>{ele.InvoiceDate}</td>
                      <td>${ele.UnitPrice}</td>
                      <td>{ele.Quantity}</td>
                      <td>${ele.Total}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="text-end" colSpan={5}>
                    Grand Total: $ {billItems!.gTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </form>
    </div>
  );
}

export default Invoice;
