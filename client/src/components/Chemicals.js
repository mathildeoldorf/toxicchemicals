import React, { useState, useEffect } from "react";
import "../css/chemicals.css";
import ChartChemicalsDelivered from "./charts/ChartChemicalsDelivered";
import ChartChemicalsDispatched from "./charts/ChartChemicalsDispatched";

export default function Chemicals() {
  //preparing for fetch
  // const [loading, setLoading] = useState(false);
  const [selectLabelsDelivered, setselectLabelsDelivered] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [selectLabelsDispatched, setSelectLabelsDispatched] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [deliveryForChart, setDeliveryForChart] = useState({
    A: 120,
    B: 101,
    C: 123,
    desc: "total",
    total: 344,
  });

  const [dispatchForChart, setDispatchForChart] = useState({
    A: 300,
    B: 78,
    C: 201,
    desc: "total",
    total: 579,
  });

  const [dispatchedByTypes, setDispatchedByTypes] = useState([
    { A: 300, B: 78, C: 201, desc: "total", total: 579 },
    { A: 10, B: 40, C: 6, desc: "today", total: 56 },
    { A: 80, B: 50, C: 16, desc: "week", total: 146 },
    { A: 150, B: 150, C: 50, desc: "month", total: 350 },
  ]);

  const [deliveredByTypes, setDeliveredByTypes] = useState([
    { A: 120, B: 101, C: 123, desc: "total", total: 344 },
    { A: 10, B: 9, C: 6, desc: "today", total: 25 },
    { A: 21, B: 14, C: 16, desc: "week", total: 51 },
    { A: 90, B: 90, C: 20, desc: "month", total: 200 },
  ]);

  const getValueForDelivered = (selectedValue) => {
    console.log(selectedValue);

    console.log({ deliveryForChart });
    deliveredByTypes.forEach((deliveredByTypes) => {
      if (selectedValue == deliveredByTypes.desc) {
        console.log({ deliveryForChart });
        console.log(deliveredByTypes);
        setDeliveryForChart({
          A: deliveredByTypes.A,
          B: deliveredByTypes.B,
          C: deliveredByTypes.C,
          desc: deliveredByTypes.desc,
          total: deliveredByTypes.total,
        });
        console.log({ deliveryForChart });
      }
    });
  };

  const getValueForDispatched = (selectedValue) => {
    console.log(selectedValue);
    dispatchedByTypes.forEach((dispatchedByTypes) => {
      if (selectedValue == dispatchedByTypes.desc) {
        setDispatchForChart({
          A: dispatchedByTypes.A,
          B: dispatchedByTypes.B,
          C: dispatchedByTypes.C,
          desc: dispatchedByTypes.desc,
          total: dispatchedByTypes.total,
        });
        console.log({ dispatchForChart });
      }
    });
  };

  useEffect(() => {
    console.log(deliveryForChart);
  }, [deliveryForChart]);

  return (
    <>
      <div>
        <h1> This is chemicals page</h1>
        <div className="chemicals-container">
          <div className="deliver-container">
            <h2>Delivered</h2>
            <select
              value={selectLabelsDelivered.value}
              onChange={(e) => getValueForDelivered(e.currentTarget.value)}
            >
              {selectLabelsDelivered.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {Object.keys(deliveryForChart).length === 0 &&
            deliveryForChart.constructor === Object ? (
              <p>Loading</p>
            ) : (
              <ChartChemicalsDelivered {...deliveryForChart} />
            )}
          </div>
          <div className="dispatch-container">
            <h2>Dispatched</h2>
            <select
              value={selectLabelsDispatched.value}
              onChange={(e) => getValueForDispatched(e.currentTarget.value)}
            >
              {selectLabelsDispatched.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {Object.keys(dispatchForChart).length === 0 &&
            dispatchForChart.constructor === Object ? (
              <p>Loading</p>
            ) : (
              <ChartChemicalsDispatched {...dispatchForChart} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
