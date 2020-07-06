import React, { useState, useEffect } from "react";
import "./../../css/chemicals.css";
import ChartChemicalsDelivered from "../charts/ChartChemicalsDelivered";
import ChartChemicalsDispatched from "../charts/ChartChemicalsDispatched";
import Loader from "../Loader.jsx";
import axios from "axios";

export default function Chemicals() {
  const [isLoading, setIsLoading] = useState(true);
  //preparing for fetch
  const [selectLabels, setSelectLabels] = useState([
    { label: "Total", value: "Total" },
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
  ]);

  const calculateWeek = () => {
    let curr = new Date()
    let week = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }
    return week
  }

  const [deliveryForChart, setDeliveryForChart] = useState({});

  const [dispatchForChart, setDispatchForChart] = useState({});

  const [dispatchedByTypes, setDispatchedByTypes] = useState([]);

  const [deliveredByTypes, setDeliveredByTypes] = useState([]);

  const getValueForDelivered = (selectedValue) => {
    setIsLoading(true);
    // console.log(selectedValue);

    // console.log({ deliveryForChart });
    deliveredByTypes.forEach((deliveredByTypes) => {
      if (selectedValue == deliveredByTypes.desc) {
        // console.log({ deliveryForChart });
        // console.log(deliveredByTypes);

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
    setIsLoading(true);
    // console.log(selectedValue);
    dispatchedByTypes.forEach((dispatchedByTypes) => {
      if (selectedValue == dispatchedByTypes.desc) {
        setDispatchForChart({
          A: dispatchedByTypes.A,
          B: dispatchedByTypes.B,
          C: dispatchedByTypes.C,
          desc: dispatchedByTypes.desc,
          total: dispatchedByTypes.total,
        });
        // console.log({ dispatchForChart });
      }
    });
  };

  const fetchjobItems = async () => {
    setIsLoading(true);
    // let response = await axios.get("http://localhost:9090/shipmentJobs");
    let response = await axios.get("https://toxicchemicals.herokuapp.com/shipmentJobs");
    let jobs = await response.data;
    // console.log(jobs);

    let incoming = { today: { A: 0, B: 0, C: 0, total: 0 }, total: { A: 0, B: 0, C: 0, total: 0 }, week: { A: 0, B: 0, C: 0, total: 0 }, month: { A: 0, B: 0, C: 0, total: 0 } };
    let outgoing = { today: { A: 0, B: 0, C: 0, total: 0 }, total: { A: 0, B: 0, C: 0, total: 0 }, week: { A: 0, B: 0, C: 0, total: 0 }, month: { A: 0, B: 0, C: 0, total: 0 } };
    let currDate = new Date().toISOString().slice(0, 10);
    let month = new Date().getMonth();
    let currWeek = calculateWeek(new Date());

    jobs.map((job, i) => {
      var date = job.dDate.split("T")[0];
      // console.log(date);
      job.dDate = date;
      return job;
    });

    jobs.forEach(job => {
      job.shipmentItem.forEach(item => {
        item.nChemicalID = item.nChemicalID === 1 ? "A" : item.nChemicalID === 2 ? "B" : "C";

        // console.log(item.nChemicalID);

        if (job.cShipmentJobType === 'I') {
          incoming.total[item.nChemicalID] = parseInt(incoming.total[item.nChemicalID]) + parseInt(item.nAmount)
          incoming.total.total = parseInt(incoming.total.total) + parseInt(item.nAmount)
          if (month === new Date(job.dDate).getMonth()) {
            incoming.month[item.nChemicalID] = parseInt(incoming.month[item.nChemicalID]) + parseInt(item.nAmount)
            incoming.month.total = parseInt(incoming.month.total) + parseInt(item.nAmount)
          }
          if (currDate == job.dDate) {
            console.log('same')
            incoming.today[item.nChemicalID] = parseInt(incoming.today[item.nChemicalID]) + parseInt(item.nAmount)
            incoming.today.total = parseInt(incoming.today.total) + parseInt(item.nAmount)
          }
          if (currWeek.includes(job.dDate)) {
            incoming.week[item.nChemicalID] = parseInt(incoming.week[item.nChemicalID]) + parseInt(item.nAmount)
            incoming.week.total = parseInt(incoming.week.total) + parseInt(item.nAmount)
          }

        } else if (job.cShipmentJobType !== 'I') {
          // console.log(job);
          // console.log(item);
          outgoing.total[item.nChemicalID] = parseInt(outgoing.total[item.nChemicalID]) + parseInt(item.nAmount)
          outgoing.total.total = parseInt(outgoing.total.total) + parseInt(item.nAmount)

          if (month === new Date(job.dDate).getMonth()) {
            outgoing.month[item.nChemicalID] = parseInt(outgoing.month[item.nChemicalID]) + parseInt(item.nAmount)
            outgoing.month.total = parseInt(outgoing.month.total) + parseInt(item.nAmount)
          }
          if (currDate === job.dDate) {
            outgoing.today[item.nChemicalID] = parseInt(outgoing.today[item.nChemicalID]) + parseInt(item.nAmount)
            outgoing.today.total = parseInt(outgoing.today.total) + parseInt(item.nAmount)
          }
          if (currWeek.includes(job.dDate)) {
            outgoing.week[item.nChemicalID] = parseInt(outgoing.week[item.nChemicalID]) + parseInt(item.nAmount)
            outgoing.week.total = parseInt(outgoing.week.total) + parseInt(item.nAmount)
          }
        }
      });
    });

    // console.log(incoming);
    // console.log(outgoing);

    setDeliveredByTypes([
      { A: incoming.today.A, B: incoming.today.B, C: incoming.today.C, desc: 'Today', total: incoming.today.total },
      { A: incoming.total.A, B: incoming.total.B, C: incoming.total.C, desc: 'Total', total: incoming.total.total },
      { A: incoming.week.A, B: incoming.week.B, C: incoming.week.C, desc: 'Week', total: incoming.week.total },
      { A: incoming.month.A, B: incoming.month.B, C: incoming.month.C, desc: 'Month', total: incoming.month.total }
    ])
    setDispatchedByTypes([
      { A: outgoing.today.A, B: outgoing.today.B, C: outgoing.today.C, desc: 'Today', total: outgoing.today.total },
      { A: outgoing.total.A, B: outgoing.total.B, C: outgoing.total.C, desc: 'Total', total: outgoing.total.total },
      { A: outgoing.week.A, B: outgoing.week.B, C: outgoing.week.C, desc: 'Week', total: outgoing.week.total },
      { A: outgoing.month.A, B: outgoing.month.B, C: outgoing.month.C, desc: 'Month', total: outgoing.month.total }

    ]);

    setDeliveryForChart({
      A: incoming.total.A,
      B: incoming.total.B,
      C: incoming.total.C,
      desc: 'Total',
      total: incoming.total.total
    });

    setDispatchForChart({
      A: outgoing.total.A,
      B: outgoing.total.B,
      C: outgoing.total.C,
      desc: 'Total',
      total: outgoing.total.total
    });

    if (dispatchForChart && deliveryForChart && deliveredByTypes && dispatchedByTypes) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchjobItems();
  }, []);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : null}
      <div className="banner paddingMedium">
        <h1>Overview | Chemicals</h1>
      </div>
      <div className="grid paddingMedium gridTwoColumns gridGapSmall">
        <div className="deliver-container">
          <h2>Delivered | Incoming</h2>
          <select
            value={selectLabels.value}
            onChange={(e) => getValueForDelivered(e.currentTarget.value)}
          >
            {selectLabels.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {Object.keys(deliveryForChart).length === 0 &&
            deliveryForChart.constructor === Object && isLoading ? (
              <p className="textCenter">Loading...</p>
            ) : (
              <ChartChemicalsDelivered {...deliveryForChart} />
            )}
        </div>
        <div className="dispatch-container">
          <h2>Dispatched | Outgoing</h2>
          <select
            value={selectLabels.value}
            onChange={(e) => getValueForDispatched(e.currentTarget.value)}
          >
            {selectLabels.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {Object.keys(dispatchForChart).length === 0 &&
            dispatchForChart.constructor === Object ? (
              <p className="textCenter">Loading...</p>
            ) : (
              <ChartChemicalsDispatched {...dispatchForChart} />
            )}
        </div>
      </div>
    </section>
  );
}
