import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartJobs from "../charts/ChartJobs";
import "../../css/home.css";
import Loader from "../Loader.jsx";

export default function StartPage() {

  const [alerts, setAlerts] = useState([]);
  const [jobDatesInProgress, setJobsDatesInProgress] = useState([]);
  const [jobDatesDone, setJobDatesDone] = useState([]);
  const [jobsDone, setJobsDone] = useState([]);
  const [jobsInProgress, setJobsInProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectLabels, setselectLabels] = useState([
    { label: "Total", value: "total" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
    { label: "Jobs in progress", value: "inProgress" },
  ]);

  // SETTING OF THE CURRENT WEEK INTO AN ARRAY OF DATES
  const calculateWeek = () => {
    let currentDate = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let firstDay = currentDate.getDate() - currentDate.getDay() + i;
      let weekday = new Date(currentDate.setDate(firstDay)).toISOString().slice(0, 10);
      week.push(weekday);
    }
    return week;
  }

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      console.log('fetching all jobs')
      let response = await axios.get("http://localhost:9090/shipmentJobs");
      let jobs = await response.data;
      // console.log(jobs);
      jobs.map((job, i) => {
        let date = job.dDate.split("T")[0];
        job.dDate = date;
        return job;
      });

      let inProgress = jobs.filter(job => job.nStatus === 0);
      setJobsDatesInProgress(inProgress);
      setJobsInProgress(inProgress);
      let done = jobs.filter(job => job.nStatus === 1);
      setJobsDone(done);
      setJobDatesDone(done);

      handleConstructDateArray(inProgress, 0);
      handleConstructDateArray(done, 1);

    } catch (error) {
      console.log(error);
      return;
    }
  }

  const handleConstructDateArray = (jobs, status) => {
    if (status === 1) {
      let dates = jobs.map((job, i) => {
        let date = job.dDate;
        return date;
      });

      if (dates) {
        console.log("Recieved dates from the dates array", status);
        // console.log(dates);
        dates = findDuplicateDates(dates);
        // console.log(dates);
        setJobDatesDone({ dates: dates });

        setIsLoading(false);
      }
    } else {
      let dates = jobs.map((job, i) => {
        let date = job.dDate;
        return date;
      });
      if (dates) {
        console.log("Recieved dates from the dates array", status);
        // console.log(dates);
        dates = findDuplicateDates(dates);
        // console.log(dates);
        setJobsDatesInProgress({ dates: dates });
        setIsLoading(false);
      }
    }
  }

  const findDuplicateDates = (dates) => {
    let dateOccurance = {};
    let result = [];

    dates.forEach(date => {
      if (!dateOccurance[date])
        dateOccurance[date] = 0;
      dateOccurance[date] += 1;
    });

    for (let date in dateOccurance) {
      result.push({ t: date, y: dateOccurance[date] })
    }
    // console.log(result);
    return result;
  }

  const getValue = (selectValue) => {
    console.log(selectValue);

    // JOBS THIS MONTH
    if (selectValue === "month") {
      fetchJobs();
      // FILTERING THE JOB ARRAY OF DATES TO FIND THE ONES MATCHING THE CURRENT MONTH
      const jobsThisMonth = jobDatesDone.dates.filter(job => {
        const jobDate = new Date(job.t).getMonth();
        const currentMonth = new Date().getMonth();
        console.log(currentMonth, jobDate);
        if (jobDate === currentMonth) {
          console.log('the month matches');
          return job
        }
      });
      console.log(jobsThisMonth);

      // CHANGE THE VIEW TO ONLY REFLECT THE JOBS OF THE CURRENT MONTH
      setJobDatesDone({ dates: jobsThisMonth });

    } else if (selectValue === "week") {
      fetchJobs();
      // FILTERING THE JOB ARRAY OF DATES TO FIND THE ONES MATCHING THE CURRENT WEEK 
      const currentWeek = calculateWeek();

      const jobsThisWeek = jobDatesDone.dates.filter(job => {
        if (currentWeek.includes(new Date(job.t).toISOString().slice(0, 10))) {
          return job
        }
      })
      setJobDatesDone({ dates: jobsThisWeek })
    } else if (selectValue === "inProgress") {
      setJobDatesDone(jobDatesInProgress);
    } else {
      fetchJobs();
      setJobDatesDone(jobDatesDone);
    }
  };

  const fetchStock = async () => {
    setIsLoading(true);
    const response = await axios('http://localhost:9090/warehouses/stock');

    const warehouses = response.data;

    let alertLevelChemicalA1 = 0;
    let alertLevelChemicalA2 = 0;

    warehouses.forEach(warehouse => {
      let nCurrentStock = 0;
      // console.log(warehouse);

      warehouse.chemicalStock.forEach(chemicalStock => {
        nCurrentStock = nCurrentStock + chemicalStock.nStock;
        // console.log(chemicalStock);
        // console.log(nCurrentStock);
        if (chemicalStock.nChemicalID === 1) {

          if (warehouse.nSiteID === 1) {
            alertLevelChemicalA1 = alertLevelChemicalA1 + chemicalStock.nStock;
            if (alertLevelChemicalA1 >= 15) {
              alerts.push({ reason: "Alert level of chemical A reached at ", site: warehouse.nSiteID, count: alertLevelChemicalA1 });
              setAlerts([...alerts]);
            }
          }
          else {
            alertLevelChemicalA2 = alertLevelChemicalA2 + chemicalStock.nStock;
            if (alertLevelChemicalA2 >= 15) {
              alerts.push({ reason: "Alert level of chemical A reached at ", site: warehouse.nSiteID, count: alertLevelChemicalA1 });
              setAlerts([...alerts]);
            }
          }
        }
        if (warehouse.nCapacity === nCurrentStock) {
          // console.log(alerts);
          alerts.push({ reason: "The warehouse is at full capacity", site: warehouse.nSiteID, warehouse: warehouse.nWarehouseID });
          setAlerts([...alerts])
        }
      })
    });

    setIsLoading(false);
  }

  const getAlerts = alerts.map((alert, i) => (
    <div className="notification colorBlack paddingMedium bgWhite marginVerticalSmall" key={i}>
      {alert.warehouse ? (
        <p className="">{alert.reason} at Warehouse #{alert.warehouse}, Site #{alert.site}</p>
      ) : (
          <>
            <p className="colorRed textCenter paddingBottomSmall"><strong>Warning</strong></p>
            <p>{alert.reason} Site #{alert.site}.</p>
            <p>The current stock onsite is {alert.count}.</p>
            <p className="paddingTopSmall">The information is sent to the fire department.</p>
          </>
        )}
    </div>
  ));

  useEffect(() => {
    fetchJobs();
    fetchStock();
    return () => setIsLoading(false);
  }, [])

  return (
    <div className="grid gridOneThird paddingHorizontalMedium gridGapSmall">
      {isLoading ? (
        <Loader />
      ) : null}
      <div className="alerts bgDark">
        <p className="notify paddingSmall marginSmall"> </p>
        <h2 className="textCenter paddingVerticalSmall">ALERT BOARD</h2>
        <span className="alignSelfTop paddingVerticalSmall">{alerts ? getAlerts : null}</span>
      </div>
      <section className="home">
        <div className="banner paddingMedium">
          <h1>Overview | Jobs</h1>
        </div>
        <div className="contentContainer paddingMedium grid gridGapSmall marginTopSmall">
          <div className="jobs box">
            <h2 className="paddingVerticalMedium">Statistics</h2>
            <select
              value={selectLabels.value}
              onChange={(e) => getValue(e.currentTarget.value)}
            >
              {selectLabels.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChartJobs {...jobDatesDone} />
            <div className="paddingVerticalMedium">
              <h2 className="paddingVerticalMedium">Completed jobs | Overview</h2>
              <ul className="jobsList colorBlack grid gridTwoColumns gridGapSmall">
                {jobsDone && jobsDone.map((job, i) => {
                  return (
                    <li key={i} className="paddingSmall bgWhite">
                      <p><strong>ID:</strong> {job.nShipmentJobID}</p>
                      <p><strong>Warehouse:</strong> {job.shipmentItem[0].nWarehouseID}</p>
                      <p><strong>Type:</strong> {job.cShipmentJobType === "I" ? "Outgoing dispatch" : "Incoming delivery"}</p>
                      <p><strong>Status:</strong> {job.nStatus ? "Done" : "In Progress"}</p>
                      <p><strong>Date:</strong> {job.dDate}</p>
                      <p><strong>Ticket no:</strong> {job.nTicketNo}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="paddingVerticalMedium">
              <h2 className="paddingVerticalMedium">Jobs in progress | Overview</h2>
              <ul className="jobsList grid gridTwoColumns gridGapSmall">
                {jobsInProgress && jobsInProgress.map((job, i) => {
                  return (
                    <li key={i} className="paddingSmall bgWhite">
                      <p><strong>ID:</strong> {job.nShipmentJobID}</p>
                      <p><strong>Warehouse:</strong> {job.shipmentItem[0].nWarehouseID}</p>
                      <p><strong>Type:</strong> {job.cShipmentJobType === "I" ? "Outgoing dispatch" : "Incoming delivery"}</p>
                      <p><strong>Status:</strong> {job.nStatus ? "Done" : "In Progress"}</p>
                      <p><strong>Date:</strong> {job.dDate}</p>
                      <p><strong>Ticket no:</strong> {job.nTicketNo}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
