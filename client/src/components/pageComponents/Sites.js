import React, { useState, useEffect } from "react";
import { Tabs, Tab, Content } from "./../../css/tab";
import "./../../css/sites.css";
import axios from 'axios';
import Loader from "../Loader.jsx";

export default function Sites() {
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);

  const [jobsSite1, setJobsSite1] = useState([]);
  const [jobsSite2, setJobsSite2] = useState([]);
  const [allJobsSite1, setAllJobsSite1] = useState([]);
  const [allJobsSite2, setAllJobsSite2] = useState([]);

  const [stockSite1, setStockSite1] = useState([]);
  const [stockSite2, setStockSite2] = useState([]);
  const [allStockSite1, setAllStockSite1] = useState([]);
  const [allStockSite2, setAllStockSite2] = useState([]);

  const [site2DataTotal, setSite2DataTotal] = useState({ A: 0, B: 0, C: 0 })
  const [site1DataTotal, setSite1DataTotal] = useState({ A: 0, B: 0, C: 0 });

  let site1ACounter = 0;
  let site1BCounter = 0;
  let site1CCounter = 0;
  let site2ACounter = 0;
  let site2BCounter = 0;
  let site2CCounter = 0;

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  let totalData = (data) => {
    let items = data[0] && data[0].items;
    if (items) {
      return items.map((key, index) => {
        return (
          <p key={index} className="tabel-item textCenter">
            {key}
          </p>
        );
      });
    }
  }

  let detailedData = (data, type) => {
    const detailedData = data.map((item, i) => {

      if (type === "jobs") {
        return (
          <div className="table-rows grid gridSevenColumns" key={i}>
            <p className="tabel-item textCenter"> {item.nShipmentJobID}</p>
            <p className="tabel-item textCenter"> {item.nTicketNo}</p>
            <p className="tabel-item textCenter"> {item.nChemicalID}</p>
            <p className="tabel-item textCenter"> {item.nAmount}</p>
            <p className="tabel-item textCenter"> {item.cShipmentJobType === "I" ? "Delivered" : "Dispatched"}</p>
            <p className="tabel-item textCenter"> {item.dDate}</p>
            <p className="tabel-item textCenter"> {item.nWarehouseID}</p>
          </div>
        );
      } else if (type === "stock") {
        return item.chemicalStock.map((stockItem, i) => {
          return (
            <div className="table-rows grid gridFourColumns" key={i}>
              <p className="tabel-item textCenter"> {stockItem.nChemicalID}</p>
              <p className="tabel-item textCenter"> {stockItem.nWarehouseID}</p>
              <p className="tabel-item textCenter"> {stockItem.nStock}</p>
              <p className="tabel-item textCenter"> {stockItem.updated_at}</p>
            </div>
          );
        });
      }
    });
    return detailedData;
  }

  const renderTableHeader = (data) => {
    let headers = data[0] && data[0].headers;
    if (headers) {
      return headers.map((key, index) => {
        return (
          <p key={index} className="tabel-header textCenter">
            {key.toUpperCase()}
          </p>
        );
      });
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      console.log('fetching all jobs')
      // let response = await axios.get("http://localhost:9090/shipmentJobs");
      let response = await axios.get("https://toxicchemicals.herokuapp.com/shipmentJobs");
      let jobs = await response.data;
      // console.log(jobs);

      let jobs1 = [];
      let jobs2 = [];

      jobs.map((job, i) => {
        var date = job.dDate.split("T")[0];
        job.dDate = date;
        job.shipmentItem.map((item) => {
          item.nChemicalID = item.nChemicalID === 1 ? "A" : item.nChemicalID === 2 ? "B" : "C";
          item.nSiteID = job.nSiteID;
          item.dDate = job.dDate;
          item.cShipmentJobType = job.cShipmentJobType;
          item.nStatus = job.nStatus;
          item.nTicketNo = job.nTicketNo;
          item.headers = [
            "Shipment ID", "Ticket No.", "Chemical", "Amount", "Type", "Date", "Warehouse",
          ];
          if (
            (item.nWarehouseID === 1 || item.nWarehouseID === 2 || item.nWarehouseID === 3 || item.nWarehouseID === 4 || item.nWarehouseID === 5)) {
            jobs1.push(item);
          } else {
            jobs2.push(item);
          }
        });

        setJobsSite1(jobs1);
        setAllJobsSite1(jobs1);
        setJobsSite2(jobs2);
        setAllJobsSite2(jobs2);
        return job;
      });

    } catch (error) {
      console.log(error);
      return;
    }

  }

  const fetchStock = async () => {
    // const response = await axios('http://localhost:9090/warehouses/stock');
    const response = await axios('https://toxicchemicals.herokuapp.com/warehouses/stock');
    const warehouses = response.data;
    // console.log(warehouses);

    warehouses.forEach(warehouse => {

      warehouse.headers = [
        "Chemical", "Warehouse", "Stock", "Updated at"
      ];

      warehouse.chemicalStock.map(item => {
        item.nChemicalID = item.nChemicalID === 1 ? "A" : item.nChemicalID === 2 ? "B" : "C";

        let dateUpdated = item.updated_at.split("T")[0];
        item.updated_at = dateUpdated;

        setStockSite1(warehouses.filter(warehouse => warehouse.nSiteID === 1));
        setAllStockSite1(warehouses.filter(warehouse => warehouse.nSiteID === 1));

        setStockSite2(warehouses.filter(warehouse => warehouse.nSiteID === 2));
        setAllStockSite2(warehouses.filter(warehouse => warehouse.nSiteID === 2));

        if (warehouse.nSiteID === 1 && item.nChemicalID === 'A') site1ACounter = site1ACounter + item.nStock;
        if (warehouse.nSiteID === 2 && item.nChemicalID === 'A') site2ACounter = site2ACounter + item.nStock;

        if (warehouse.nSiteID === 1 && item.nChemicalID === 'B') site1BCounter = site1BCounter + item.nStock;
        if (warehouse.nSiteID === 2 && item.nChemicalID === 'B') site2BCounter = site2BCounter + item.nStock;
        if (warehouse.nSiteID === 1 && item.nChemicalID === 'C') site1CCounter = site1CCounter + item.nStock;
        if (warehouse.nSiteID === 2 && item.nChemicalID === 'C') site2CCounter = site2CCounter + item.nStock;

        setSite1DataTotal([{ headers: ["A", "B", "C "], items: [site1ACounter, site1BCounter, site1CCounter] }]);
        setSite2DataTotal([{ headers: ["A", "B", "C "], items: [site2ACounter, site2BCounter, site2CCounter] }]);
      });
    });

    setIsLoading(false);
  }

  useEffect(() => {
    totalData(site1DataTotal);
    fetchJobs();
    fetchStock();
  }, [])
  return (
    <div className="grid gridOneThird paddingHorizontalMedium gridGapSmall">
      {isLoading ? (
        <Loader />
      ) : null}
      <Content active={active === 0}>
        <div className="buttonWrapper grid">
          <button disabled className="grid alignItemsCenter headerFilter">SHIPMENTS</button>
          <button onClick={() => setJobsSite1(allJobsSite1)} className="grid alignItemsCenter">All shipments</button>
          <button onClick={() => setJobsSite1(allJobsSite1.sort((a, b) => a.dDate - b.dDate))} className="grid alignItemsCenter">Shipments by date</button>
          <button onClick={() => setJobsSite1(allJobsSite1.filter(job => job.nChemicalID === "A"))} className="grid alignItemsCenter">Shipments with A chemicals</button>
          <button onClick={() => setJobsSite1(allJobsSite1.filter(job => job.nChemicalID === "B"))} className="grid alignItemsCenter">Shipments with B chemicals</button>
          <button onClick={() => setJobsSite1(allJobsSite1.filter(job => job.nChemicalID === "C"))} className="grid alignItemsCenter">Shipments with C chemicals</button>
          <button onClick={() => setJobsSite1(allJobsSite1.filter(job => job.cShipmentJobType === "I"))} className="grid alignItemsCenter">Shipments delivered</button>
          <button onClick={() => setJobsSite1(allJobsSite1.filter(job => job.cShipmentJobType === "O"))} className="grid alignItemsCenter">Shipments dispatched</button>
          <button disabled className="grid alignItemsCenter headerFilter">STOCK</button>
          <button onClick={() => setStockSite1(allStockSite1)} className="grid alignItemsCenter">Total stock</button>
          <button onClick={() => setStockSite1(allStockSite1.sort((a, b) => a.nWarehouseID - b.nWarehouseID))} className="grid alignItemsCenter">Stock sorted by warehouse</button>
          <button onClick={() => setStockSite1(allStockSite1.filter((stock) => stock.nWarehouseID === 1))} className="grid alignItemsCenter">Stock in warehouse 1</button>
          <button onClick={() => setStockSite1(allStockSite1.filter((stock) => stock.nWarehouseID === 2))} className="grid alignItemsCenter">Stock in warehouse 2</button>
          <button onClick={() => setStockSite1(allStockSite1.filter((stock) => stock.nWarehouseID === 3))} className="grid alignItemsCenter">Stock in warehouse 3</button>
          <button onClick={() => setStockSite1(allStockSite1.filter((stock) => stock.nWarehouseID === 4))} className="grid alignItemsCenter">Stock in warehouse 4</button>
          <button onClick={() => setStockSite1(allStockSite1.filter((stock) => stock.nWarehouseID === 5))} className="grid alignItemsCenter">Stock in warehouse 5</button>
        </div>
      </Content>
      <Content active={active === 1}>
        <div className="buttonWrapper grid">
          <button disabled className="grid alignItemsCenter headerFilter">SHIPMENTS</button>
          <button onClick={() => setJobsSite2(allJobsSite2)} className="grid alignItemsCenter">All shipments</button>
          <button onClick={() => setJobsSite2(allJobsSite2.sort((a, b) => a.dDate - b.dDate))} className="grid alignItemsCenter">Shipments by date</button>
          <button onClick={() => setJobsSite2(allJobsSite2.filter(job => job.nChemicalID === "A"))} className="grid alignItemsCenter">Shipments with A chemicals</button>
          <button onClick={() => setJobsSite2(allJobsSite2.filter(job => job.nChemicalID === "B"))} className="grid alignItemsCenter">Shipments with B chemicals</button>
          <button onClick={() => setJobsSite2(allJobsSite2.filter(job => job.nChemicalID === "C"))} className="grid alignItemsCenter">Shipments with C chemicals</button>
          <button onClick={() => setJobsSite2(allJobsSite2.filter(job => job.cShipmentJobType === "I"))} className="grid alignItemsCenter">Shipments delivered</button>
          <button onClick={() => setJobsSite2(allJobsSite2.filter(job => job.cShipmentJobType === "O"))} className="grid alignItemsCenter">Shipments dispatched</button>
          <button disabled className="grid alignItemsCenter headerFilter">STOCK</button>
          <button onClick={() => setStockSite2(allStockSite2)} className="grid alignItemsCenter">Total stock</button>
          <button onClick={() => setStockSite2(allStockSite2.sort((a, b) => a.nWarehouseID - b.nWarehouseID))} className="grid alignItemsCenter">Stock sorted by warehouse</button>
          <button onClick={() => setStockSite2(allStockSite2.filter((stock) => stock.nWarehouseID === 6))} className="grid alignItemsCenter">Stock in warehouse 6</button>
          <button onClick={() => setStockSite2(allStockSite2.filter((stock) => stock.nWarehouseID === 7))} className="grid alignItemsCenter">Stock in warehouse 7</button>
          <button onClick={() => setStockSite2(allStockSite2.filter((stock) => stock.nWarehouseID === 8))} className="grid alignItemsCenter">Stock in warehouse 8</button>
          <button onClick={() => setStockSite2(allStockSite2.filter((stock) => stock.nWarehouseID === 9))} className="grid alignItemsCenter">Stock in warehouse 9</button>
          <button onClick={() => setStockSite2(allStockSite2.filter((stock) => stock.nWarehouseID === 10))} className="grid alignItemsCenter">Stock in warehouse 10</button>
        </div>
      </Content>
      <section className="sites">
        <div className="banner paddingMedium marginVerticalSmall">
          <h1>Overview | Sites</h1>
        </div>
        <Tabs>
          <Tab onClick={handleClick} active={active === 0} id={0}>
            Site 1
        </Tab>

          <Tab onClick={handleClick} active={active === 1} id={1}>
            Site 2
        </Tab>
        </Tabs>

        <Content active={active === 0}>
          <div className="grid paddingMedium">
            <h1 className="textCenter">Site 1</h1>
            <div className="paddingMedium">
              <h2>Total Inventory:</h2>
              <div className="tableHeaders grid gridThreeColumns">
                {renderTableHeader(site1DataTotal)}
              </div>
              <div className="total table-rows grid gridThreeColumns">
                {site1DataTotal && totalData(site1DataTotal)}
              </div>
            </div>
            <div className="paddingMedium">
              <h2>Shipments</h2>
              <div className="tableHeaders grid gridSevenColumns">
                {renderTableHeader(jobsSite1)}
              </div>
              {jobsSite1 && detailedData(jobsSite1, "jobs")}
            </div>
            <div className="paddingMedium">
              <h2>Stock</h2>
              <div className="tableHeaders grid gridFourColumns">
                {renderTableHeader(stockSite1)}
              </div>
              {jobsSite1 && detailedData(stockSite1, "stock")}
            </div>
          </div>
        </Content>
        <Content active={active === 1}>
          <div className="grid paddingMedium">
            <h1 className="textCenter">Site 2</h1>
            <div className="paddingMedium">
              <h2>Total Inventory:</h2>
              <div className="tableHeaders grid gridThreeColumns">
                {renderTableHeader(site2DataTotal)}
              </div>
              <div className="total table-rows grid gridThreeColumns">
                {site2DataTotal && totalData(site2DataTotal)}
              </div>
            </div>
            <div className="paddingMedium">
              <h2>Shipments</h2>
              <div className="tableHeaders grid gridSevenColumns">
                {renderTableHeader(jobsSite2)}
              </div>
              {jobsSite2 && detailedData(jobsSite2, "jobs")}
            </div>
            <div className="paddingMedium">
              <h2>Stock</h2>
              <div className="tableHeaders grid gridFourColumns">
                {renderTableHeader(stockSite2)}
              </div>
              {jobsSite2 && detailedData(stockSite2, "stock")}
            </div>
          </div>
        </Content>
      </section>
    </div>
  );
}
