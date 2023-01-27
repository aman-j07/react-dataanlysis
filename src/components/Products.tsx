import React, { useRef, useState } from "react";
import { data, prodDetails } from "../types";

type TProps = {
  data: data[];
  products: string[];
};

function Products(props: TProps) {
  const { data, products } = props;
  const refDescription = useRef<HTMLSelectElement>(null);
  const [prodDetails, setProdDetails] = useState<prodDetails>({
    Description: "",
    OrderCount: 0,
    TotalQuantity: 0,
  });
  const generateProductDetails = () => {
    let description = refDescription.current!.value;
    let temp = {
      Description: description,
      OrderCount: 0,
      TotalQuantity: 0,
    };
    prodDetails.Description = refDescription.current!.value;
    data.forEach((ele) => {
      if (ele.Description === description) {
        temp.OrderCount++;
        temp.TotalQuantity += parseInt(ele.Quantity);
      }
    });
    setProdDetails({ ...temp });
  };

  return (
    <div className="card shadow rounded-2 p-4 mb-4">
      <form>
        <div className="mb-3">
          <label className="form-label">Select Product</label>
          <select
            ref={refDescription}
            className="form-select"
            onChange={generateProductDetails}
          >
            {products.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          {prodDetails.Description !== "" && (
            <table className="table table-striped border mt-2">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Description</th>
                  <th>Order Count</th>
                  <th>Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{prodDetails.Description}</td>
                  <td>{prodDetails.OrderCount}</td>
                  <td>{prodDetails.TotalQuantity}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </form>
    </div>
  );
}

export default Products;
