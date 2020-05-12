import React, { useState } from "react";
import "../css/warehouse.css";

import ChartWarehouse from "./charts/ChartWarehouse";

// (1st-10ku, 2nd-12ku, 3rd-5ku, 4th-3ku, 5th-9ku)

export default function Warehouses() {
  const [data1, setData1] = useState({ A: 3, C: 6, warehouse: 1 });
  const [data2, setData2] = useState({ A: 10, C: 1, warehouse: 2 });
  const [data3, setData3] = useState({ B: 5, warehouse: 3 });
  const [data4, setData4] = useState({ B: 1, C: 2, warehouse: 4 });
  const [data5, setData5] = useState({ A: 3, C: 4, warehouse: 5 });
  const [data6, setData6] = useState({ A: 1, C: 8, warehouse: 6 });
  const [data7, setData7] = useState({ A: 2, C: 9, warehouse: 7 });
  const [data8, setData8] = useState({ B: 3, warehouse: 8 });
  const [data9, setData9] = useState({ B: 3, C: 5, warehouse: 9 });
  const [data10, setData10] = useState({ A: 1, C: 12, warehouse: 10 });

  return (
    <>
      <h1> This is warehouse page</h1>
      <h2>Site 1</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
          <ChartWarehouse {...data1} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data2} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data3} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data4} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data5} />
        </div>
      </div>
      <h2>Site 2</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
          <ChartWarehouse {...data6} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data7} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data8} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data9} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...data10} />
        </div>
      </div>
    </>
  );
}
