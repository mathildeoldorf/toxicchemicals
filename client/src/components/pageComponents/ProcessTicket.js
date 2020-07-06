import React, { useEffect, useState } from "react";
import './../../css/ticket.css';
import { Tabs, Tab, Content } from "./../../css/tab";
import Loader from "../Loader.jsx";
import axios from "axios";

export default function ProcessTicket() {
  const [isLoading, setIsLoading] = useState(true);

  const [ticketType, setTicketType] = useState()
  const [chemical1, setChemical1] = useState()
  const [chemicalAmount1, setChemicalAmount1] = useState()
  const [chemical2, setChemical2] = useState()
  const [chemicalAmount2, setChemicalAmount2] = useState()
  const [ticket, setTicket] = useState()

  const [stockSite1, setStockSite1] = useState([]);
  const [stockSite2, setStockSite2] = useState([]);
  const [allStockSite1, setAllStockSite1] = useState([]);
  const [allStockSite2, setAllStockSite2] = useState([]);

  const [site1Stock, setSite1Stock] = useState()
  const [site2Stock, setSite2Stock] = useState()
  const [job, setJob] = useState()
  const [process, setProcess] = useState(false)

  const [error, setError] = useState()

  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const checkIfSiteContainsChemicals = (site) => {

    console.log(stockSite1);
    console.log(stockSite2);

    let currentTotalInventory = 0;
    if (site === "site1") {
      stockSite1.forEach(warehouse => {
        // console.log(warehouse);
        currentTotalInventory = warehouse.nCurrentStock + currentTotalInventory
      })
    } else {
      stockSite2.forEach(warehouse => {
        // console.log(warehouse);
        currentTotalInventory = warehouse.nCurrentStock + currentTotalInventory
      })
    }

    if (currentTotalInventory >= ticket.totalAmount) {
      return true
    } else {
      return false
    }
  }

  const checkIfSpaceAtSite = (site) => {
    let totalSiteCapacity = 0;
    console.log(site);
    if (site === "site1") {
      stockSite1.forEach(warehouse => {
        totalSiteCapacity = warehouse.nCapacity + totalSiteCapacity
      })
    } else {
      stockSite2.forEach(warehouse => {
        totalSiteCapacity = warehouse.nCapacity + totalSiteCapacity
      })
    }
    // console.log(totalSiteCapacity ,ticket.totalAmount)
    if (totalSiteCapacity >= parseInt(ticket.totalAmount)) {
      console.log('true');
      return true
    }
    else {
      return false
    }
  }

  const processWarehouseInventory = (warehouse) => {
    let chemicalsAllowed;
    console.log('process inventory');
    console.log(warehouse.chemicalStock);
    if (warehouse.chemicalStock.length !== 0) {

      warehouse.chemicalStock.map((chemicalInStock) => {
        console.log(chemicalInStock);
        if (chemicalInStock.nChemicalID === "A") {
          chemicalsAllowed = ['A', 'C']
        } else if (chemicalInStock.nChemicalID === "B") {
          chemicalsAllowed = ['B', 'C']
        } else if (chemicalInStock.nChemicalID === "C") {
          chemicalsAllowed = ['A', 'B', 'C']
        }
      });
      // const chemicalInventory = Object.keys(warehouse.chemicalInventory)
      return { chemicalsAllowed, remainingStorage: warehouse.nCapacity - warehouse.nCurrentStock }

      // console.log(warehouse.capacity - warehouse.current_stock, warehouse.chemicalInventory, warehouse.current_stock)
    } else {
      // console.log(warehouse.capacity - warehouse.current_stock)
      return { chemicalsAllowed: ['A', 'B', 'C'], remainingStorage: warehouse.nCapacity - warehouse.nCurrentStock }
    }
  }

  const findWarehousesForDispatch = () => {
    let aWarehousesToRemoveFrom = [];
    let warehouses;
    if (ticket.site === "site1") {
      warehouses = stockSite1;
    } else {
      console.log('site2');
      warehouses = stockSite2;
    }
    let ticketTemp = ticket;

    Object.keys(ticketTemp.chemicals).map(chemical => {
      console.log(chemical);
      const amount = ticketTemp.chemicals[chemical];
      console.log(amount);
      for (let i = 0; i < amount; i++) {
        console.log(ticketTemp.totalAmount);
        let warehouseToRemoveFrom;
        warehouses.find(warehouse => {
          // console.log(warehouse)
          if (warehouse.chemicalStock) {
            // console.log('has stock');
            // console.log(warehouse.chemicalStock);
            warehouse.chemicalStock.find((chemicalInStock, i) => {
              console.log(chemical);

              if (chemicalInStock.nChemicalID === chemical && chemicalInStock.nStock !== 0 && ticketTemp.chemicals[chemical] !== 0) {
                console.log('has chemical and is not empty');
                console.log(chemicalInStock);
                --chemicalInStock.nStock;
                --warehouse.nCurrentStock;
                --ticketTemp.chemicals[chemical]
                --ticketTemp.totalAmount

                console.log(warehouse)

                warehouseToRemoveFrom = { ...warehouse };

                const warehouseID = warehouse.nWarehouseID;
                console.log(warehouseID);
                console.log(warehouseToRemoveFrom);

                let existingInArray = aWarehousesToRemoveFrom.filter(placement => placement.warehouse === warehouseID);
                console.log(existingInArray);
                if (existingInArray.length) {
                  console.log(existingInArray)
                  let index = aWarehousesToRemoveFrom.findIndex(placement => placement.warehouse === warehouseID);
                  aWarehousesToRemoveFrom[index].amount++
                } else {
                  aWarehousesToRemoveFrom.push({ 'warehouse': warehouseID, 'chemical': chemical, 'amount': 1 });

                  console.log(aWarehousesToRemoveFrom);
                }
              }
            });
          } else {
            console.log('false', warehouse)
            return false
          }
        });
      }
    })
    if (ticketTemp.totalAmount !== 0) {
      console.log('could not do job')
      return false
    } else {
      return aWarehousesToRemoveFrom
    }
  }

  const placeChemical = (amount, chemical, ticketTemp) => {
    let aWarehousesToStore = [];
    let warehouses;
    if (ticket.site === 'site1') {
      warehouses = stockSite1
    } else {
      warehouses = stockSite2
    }
    for (let i = 0; i < amount; i++) {
      const warehouseToStore = warehouses.find((warehouse, index) => {
        console.log('os', warehouse.chemicalStock);
        const chemicalsAllowed = processWarehouseInventory(warehouse).chemicalsAllowed;
        let remainingStorage = processWarehouseInventory(warehouse).remainingStorage;
        console.log(warehouse.nWarehouseID, chemicalsAllowed, remainingStorage)
        // console.log(warehouse)
        if (chemicalsAllowed.includes(chemical) && remainingStorage >= 1) {
          if (chemical === 'A') {
            let nextWarehouse = warehouses[index + 1];
            let nextWarehouseStock = nextWarehouse.chemicalStock.map((chemicalInStock) => chemicalInStock.nChemicalID === "A");
            let previousWarehouse = warehouses[index - 1];

            if (nextWarehouse) {

              nextWarehouse.chemicalStock.map((chemicalInStock) => {
                if (chemicalInStock.nChemicalID === "A") {
                  console.log('A is present at the next warehouse');
                  console.log(nextWarehouse);
                  return false;
                }
              });
            }

            if (previousWarehouse) {
              previousWarehouse.chemicalStock.map((chemicalInStock) => {
                if (chemicalInStock.nChemicalID === "A") {
                  console.log('A is present at the previous warehouse');
                  console.log(previousWarehouse);
                  return false;
                }
              });
            }

            if (warehouse.chemicalStock === undefined) {
              console.log("pushing chemical A into the warehouse's empty chemical stock");
              warehouse.chemicalStock.push({
                nWarehouseID: warehouse.nWarehouseID,
                nChemicalID: chemical,
                nStock: 1
              });
            } else if (!warehouse.chemicalStock.find(chemicalInStock => chemicalInStock.nChemicalID === chemical)) {
              console.log("pushing chemical A into the warehouse's not containg A chemical stock");
              warehouse.chemicalStock.push({
                nWarehouseID: warehouse.nWarehouseID,
                nChemicalID: chemical,
                nStock: 1
              });
            } else {
              warehouse.chemicalStock.map((chemicalInStock) => {
                if (chemicalInStock.nChemicalID === "A") {
                  ++chemicalInStock.nStock;
                }
              });
            }
            ++warehouse.nCurrentStock;
            --ticketTemp.chemicals[chemical];
            --ticketTemp.totalAmount;

            if (warehouse.chemicalStock.find(chemicalInStock => chemicalInStock.nChemicalID === chemical && chemicalInStock.nStock === 0)) {
              warehouse.chemicalStock.filter(chemicalInStock => chemicalInStock.nChemicalID !== chemical);
              console.log(warehouse.chemicalStock);
            }

            console.log(warehouse);
            return warehouse

          } else {
            if (warehouse.chemicalStock === undefined) {
              console.log(`pushing chemical ${chemical} into the warehouse's empty chemical stock`);
              warehouse.chemicalStock.push({
                nWarehouseID: warehouse.nWarehouseID,
                nChemicalID: chemical,
                nStock: 1
              });
            } else if (!warehouse.chemicalStock.find(chemicalInStock => chemicalInStock.nChemicalID === chemical)) {
              console.log(`pushing chemical ${chemical} into the warehouse's not containg A chemical stock`);
              warehouse.chemicalStock.push({
                nWarehouseID: warehouse.nWarehouseID,
                nChemicalID: chemical,
                nStock: 1
              });
            } else {
              console.log(`Adding another chemical of ${chemical} to the warehouse chemical stock`);
              warehouse.chemicalStock.map((chemicalInStock) => {
                if (chemicalInStock.nChemicalID === chemical) {
                  ++chemicalInStock.nStock;
                }

                console.log(chemicalInStock);
              });
              console.log(warehouse.chemicalStock);
            }

            ++warehouse.nCurrentStock;
            --ticketTemp.chemicals[chemical];
            --ticketTemp.totalAmount;

            if (warehouse.chemicalStock.find(chemicalInStock => chemicalInStock.nChemicalID === chemical && chemicalInStock.nStock === 0)) {
              warehouse.chemicalStock.filter(chemicalInStock => chemicalInStock.nChemicalID !== chemical);
              console.log(warehouse.chemicalStock);
            }

            console.log(warehouse);
            return warehouse

          }
        }
      })
      if (warehouseToStore) {
        console.log(warehouseToStore);
        const warehouseID = warehouseToStore.nWarehouseID

        let existingInArray = aWarehousesToStore.filter(placement => placement.warehouse === warehouseID)
        if (existingInArray.length) {
          // console.log('a',existingInArray)

          const index = aWarehousesToStore.findIndex(placement => placement.warehouse === warehouseID && placement.chemical === chemical)

          aWarehousesToStore[index].amount++
        } else {
          aWarehousesToStore.push({ 'warehouse': warehouseID, 'chemical': chemical, 'amount': 1 })
        }
      }
    }
    // aWarehousesToStore.forEach(a=> console.log('a:',a))
    console.log(aWarehousesToStore)
    return aWarehousesToStore
  }

  const findWarehousesForDelivery = () => {
    let placementArray = [];
    let ticketTemp = ticket;
    // console.log('amount', amount)
    Object.keys(ticketTemp.chemicals).map(chemical => {
      const amount = ticketTemp.chemicals[chemical]
      const warehouseArray = placeChemical(amount, chemical, ticketTemp);
      placementArray.push(...warehouseArray);
    })

    if (ticketTemp.totalAmount !== 0) {
      return false
    }
    return placementArray
  }

  const processTicket = async () => {
    console.log('process ticket')
    console.log(ticket)

    if (ticket.type === 'O') {
      if (checkIfSiteContainsChemicals(ticket.site)) {
        console.log('enough')
        const placementArray = findWarehousesForDispatch();
        if (placementArray) {
          console.log(placementArray, "found a match for dispatching");
          setJob({ status: 'inProcess', type: ticket.type, placementArray })
          setTicket({ ...ticket, status: 'Approved' });
          setProcess(false);
        } else {
          console.log("did not find a match for dispatching with enough chemicals");
          setTicket({ ...ticket, status: 'Denied' });
          // clearPage()
        }
        // not enough chemicals
      } else {
        console.log("did not find a match for dispatching at all");
        setTicket({ ...ticket, status: 'Denied' });
        // clearPage()
      }
    }
    if (ticket.type === 'I') {
      if (checkIfSpaceAtSite(ticket.site)) {
        console.log('space');
        const placementArray = findWarehousesForDelivery();
        if (placementArray) {
          console.log(placementArray, "found a match for delivery");
          setJob({ status: 'inProcess', type: ticket.type, placementArray });
          setTicket({ ...ticket, status: 'Approved' });
          setProcess(false);
        } else {
          console.log("did not find a match for delivery with enough space for chemicals");
          setTicket({ ...ticket, status: 'Denied' });
          clearPage();
        }
        //    not enough space at site
      } else {
        console.log('ticket denied')
        console.log("did not find a match for delivering at all");
        setTicket({ ...ticket, status: 'Denied' });
        clearPage();
      }
    }

    console.log(stockSite1);
    console.log(stockSite2);

  }

  const clearError = () => {
    console.log('clear Error')
    setTimeout(() => {
      setError()
      setProcess(false)
      clearPage()
    }, 2500)
  }

  const handleSubmit = async (e, site) => {
    console.log('click');
    e.preventDefault();

    if (ticketType && chemical1 && chemicalAmount1 && !chemical2) {

      console.log('continue', process)
      setTicket({
        'chemicals': { [chemical1]: parseInt(chemicalAmount1) },
        'type': ticketType,
        'totalAmount': parseInt(chemicalAmount1),
        'status': 'pending',
        site
      })
      setProcess(true)
    } else if (ticketType && chemical1 && chemicalAmount1 && chemical2 && chemicalAmount2) {

      setTicket({
        'chemicals': { [chemical1]: parseInt(chemicalAmount1), [chemical2]: parseInt(chemicalAmount2) },
        'type': ticketType,
        'totalAmount': parseInt(chemicalAmount1) + parseInt(chemicalAmount2),
        'status': 'pending',
        site
      })
      setProcess(true)
    } else {
      setError('Please fill out form fields with ticket information correctly')
      clearError()
    }
  }

  const clearPage = () => {
    setTimeout(() => {
      setJob(null)
      setTicket(null)
      setChemical1('')
      setChemical2('')
      setChemicalAmount1('')
      setChemicalAmount2('')
      setTicketType('')
      setProcess(false)
    }, 3000)
  }

  const fetchStock = async () => {
    const response = await axios('http://localhost:9090/warehouses/stock');
    const warehouses = response.data;
    console.log(warehouses);

    warehouses.forEach(warehouse => {

      warehouse.headers = [
        "Chemical", "Warehouse", "Stock", "Updated at"
      ];

      warehouse.chemicalStock.map(item => {
        item.nChemicalID = item.nChemicalID === 1 ? "A" : item.nChemicalID === 2 ? "B" : "C";

        let dateUpdated = item.updated_at.split("T")[0];
        item.updated_at = dateUpdated;

        setStockSite1(warehouses.filter(warehouse => warehouse.nSiteID === 1));
        setStockSite2(warehouses.filter(warehouse => warehouse.nSiteID === 2));
      });
    });

    setIsLoading(false);
  }

  const fetchPostJob = async () => {
    console.log(job);
    console.log(stockSite1);
    console.log(stockSite2);
    try {
      console.log("posting a job ", job);
      const response = await axios.post(`http://localhost:9090/processJob`, { job });
      console.log(response.data.response)
      if (response.data.response) {
        setJob({ ...job, status: 'Confirmed' });
        clearPage();
      }
    } catch (err) {
      console.log(err.response.data.error);
      return;
    }
  }

  useEffect(() => {
    fetchStock();
    if (ticket && !job) {
      processTicket();
    }
    if (job && job.status === 'inProcess') {
      console.log('send job to db', job)
      console.log({ ...job.placementArray })
      fetchPostJob()
    }
  }, [process])

  // console.log(process, ticket, job, stockSite1, stockSite2)
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : null}
      {error ? <div className="error">{error}</div> : null}
      <Tabs className="tabs">
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Site 1
            </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          Site 2
            </Tab>
      </Tabs>
      <Content active={active === 0} className="contentSite1">
        <h1 className="textCenter">Process ticket at Site 1</h1>
        <div className="update">
          {ticket ? <h2 className="textCenter">Ticket: {ticket.status}</h2> : null}
          {job ? <h2 className="textCenter">Job: {job.status}</h2> : null}
        </div>
        <h3 className="textCenter paddingVerticalSmall">Fill in ticket information</h3>
        <form >
          <label>
            <p className="paddingVerticalSmall">Select type of Ticket</p>
            <select name="type" value={ticketType || ''} onChange={(e) => setTicketType(e.target.value)}>
              <option value="null">Select Ticket Type</option>
              <option value="O">Dispatch</option>
              <option value="I">Delivery</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Select type of Chemical</p>
            <select name="chemical1" value={chemical1 || ''} onChange={(e) => setChemical1(e.target.value)}>
              <option value="null">Select Chemical</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Amount</p>
            <input type="number" name="amount1" placeholder="Select amount" value={chemicalAmount1 || ''} onChange={(e) => setChemicalAmount1(e.target.value)} />
          </label>
          <label>
            <p className="paddingVerticalSmall">Select type of Chemical</p>
            <select name="chemical2" value={chemical2 || ''} onChange={(e) => setChemical2(e.target.value)}>
              <option value="null">Select Chemical</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Amount</p>
            <input type="number" name="amount2" placeholder="Select amount" value={chemicalAmount2 || ''} onChange={(e) => setChemicalAmount2(e.target.value)} />
          </label>
          <button className="marginVerticalSmall" onClick={(e) => handleSubmit(e, "site1")}>Process Ticket</button>
        </form>
      </Content>

      <Content active={active === 1}>
        <h1 className="textCenter">Process ticket at Site 2</h1>
        <div className="update">
          {ticket ? <h2 className="textCenter">Ticket: {ticket.status}</h2> : null}
          {job ? <h2 className="textCenter">Job: {job.status}</h2> : null}
        </div>
        <h3 className="textCenter paddingVerticalSmall">Fill in ticket information</h3>
        <form className="formSite2" >
          <label>
            <p className="paddingVerticalSmall">Select type of Ticket</p>
            <select name="type" value={ticketType || ''} onChange={(e) => setTicketType(e.target.value)}>
              <option value="null">Select Ticket Type</option>
              <option value="O">Dispatch</option>
              <option value="I">Delivery</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Select type of Chemical</p>
            <select name="chemical1" value={chemical1 || ''} onChange={(e) => setChemical1(e.target.value)}>
              <option value="null">Select Chemical</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Amount</p>
            <input type="number" placeholder="Select amount" name="amount1" value={chemicalAmount1 || ''} onChange={(e) => { console.log(e.target.value); setChemicalAmount1(e.target.value) }} />
          </label>
          <label>
            <p className="paddingVerticalSmall">Select type of Chemical</p>
            <select name="chemical2" value={chemical2 || ''} onChange={(e) => setChemical2(e.target.value)}>
              <option value="null">Select Chemical</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <label>
            <p className="paddingVerticalSmall">Amount</p>
            <input type="number" name="amount2" placeholder="Select amount" value={chemicalAmount2 || ''} onChange={(e) => setChemicalAmount2(e.target.value)} />
          </label>
          <button className="marginVerticalSmall" onClick={(e) => handleSubmit(e, "site2")}>Process Ticket</button>
        </form>
      </Content>
    </section>
  )
}


