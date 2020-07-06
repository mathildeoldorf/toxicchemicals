import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/warehouse.css";
import Loader from "../Loader.jsx";
import ChartWarehouse from "./../charts/ChartWarehouse";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStock = async () => {
    // const response = await axios('http://localhost:9090/warehouses/stock');
    const response = await axios('https://toxicchemicals.herokuapp.com/warehouses/stock');
    const warehouses = response.data;

    warehouses.forEach(warehouse => {
      let stockObj = {}
      warehouse.chemicalStock.map(item => {
        item.nChemicalID = item.nChemicalID === 1 ? "A" : item.nChemicalID === 2 ? "B" : "C";
        if (item.nStock !== 0) {
          let temp = {};
          temp[item.nChemicalID] = item.nStock;
          stockObj = { ...temp, ...stockObj };
          return temp;
        }
      });
      warehouse.chemicalStock = { ...stockObj };
      // console.log(warehouse.chemicalStock);
    });

    // console.log(warehouses);
    setWarehouses(warehouses);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : null}
      <div className="banner paddingMedium">
        <h1>Overview | Warehouses</h1>
      </div>
      <h2 className="paddingSmall textCenter">Site 1</h2>
      <div className="paddingMedium grid gridTwoColumns gridGapSmall marginTopSmall">
        {warehouses.map((warehouse, i) =>
          warehouse.nSiteID === 1 ? (
            <div key={i} className="canvas-container">
              <ChartWarehouse {...warehouse.chemicalStock} id={warehouse.nWarehouseID} />
            </div>
          ) : null
        )
        }
      </div>
      <h2 className="paddingSmall textCenter">Site 2</h2>
      <div className="paddingMedium grid gridTwoColumns gridGapSmall marginTopSmall">
        {warehouses.map((warehouse, i) =>
          warehouse.nSiteID === 2 ? (
            <div key={i} className="canvas-container">
              <ChartWarehouse {...warehouse.chemicalStock} id={warehouse.nWarehouseID} />
            </div>
          ) : null
        )
        }
      </div>
    </section>
  );
}
