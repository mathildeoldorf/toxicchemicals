import React, { useState } from "react";
import ChartJobs from "./charts/ChartJobs";
import "../css/startPage.css";

export default function StartPage() {
  const [alerts, setAlerts] = useState({
    alerts: [
      {
        reason: "More than 15 A",
        warehouse: "2",
      },
    ],
  });

  console.log(alerts.alerts);
  const [jobsAmonth, setJobsAmonth] = useState(134);
  const [jobsAweek, setJobsAweek] = useState(20);
  const [jobsAday, setJobsAday] = useState(3);

  const [selectLabels, setselectLabels] = useState([
    { label: "last week", value: "week" },
    { label: "last month", value: "month" },
  ]);

  //by default last 6 days are shown, on select can change to a month
  const [jobsDone, setJobDone] = useState({
    dates: [
      {
        t: new Date("2020-5-01"),
        y: 3,
      },
      {
        t: new Date("2020-5-03"),
        y: 6,
      },

      {
        t: new Date("2020-5-05"),
        y: 12,
      },

      {
        t: new Date("2020-5-06"),
        y: 2,
      },

      {
        t: new Date("2020-5-07 13:3"),
        y: 10,
      },
      {
        t: new Date("2020-5-08 13:3"),
        y: 6,
      },
    ],
  });

  // const []

  const getAlerts = alerts.alerts.map((alert, i) => (
    <div className="notification" key={i}>
      <p className="notify"> </p>
      {alert.reason} at warehouse #{alert.warehouse}
    </div>
  ));

  const getValue = (selectValue) => {
    console.log(selectValue);
    if (selectValue == "month") {
      setJobDone({
        dates: [
          {
            t: new Date("2020-5-01"),
            y: 3,
          },
          {
            t: new Date("2020-5-03"),
            y: 6,
          },

          {
            t: new Date("2020-5-05"),
            y: 12,
          },

          {
            t: new Date("2020-5-06"),
            y: 2,
          },

          {
            t: new Date("2020-5-07 13:3"),
            y: 10,
          },
          {
            t: new Date("2020-5-08 13:3"),
            y: 6,
          },
          {
            t: new Date("2020-5-11"),
            y: 3,
          },
          {
            t: new Date("2020-5-12"),
            y: 6,
          },

          {
            t: new Date("2020-5-14"),
            y: 32,
          },

          {
            t: new Date("2020-5-17"),
            y: 2,
          },

          {
            t: new Date("2020-5-19"),
            y: 23,
          },
          {
            t: new Date("2020-5-21"),
            y: 1,
          },

          {
            t: new Date("2020-5-23"),
            y: 6,
          },

          {
            t: new Date("2020-5-24"),
            y: 32,
          },

          {
            t: new Date("2020-5-25"),
            y: 2,
          },

          {
            t: new Date("2020-5-27"),
            y: 23,
          },
          {
            t: new Date("2020-5-31"),
            y: 1,
          },
        ],
      });
    } else {
      setJobDone({
        dates: [
          {
            t: new Date("2020-5-01"),
            y: 3,
          },
          {
            t: new Date("2020-5-03"),
            y: 6,
          },

          {
            t: new Date("2020-5-05"),
            y: 12,
          },

          {
            t: new Date("2020-5-06"),
            y: 2,
          },

          {
            t: new Date("2020-5-07 13:3"),
            y: 10,
          },
          {
            t: new Date("2020-5-08 13:3"),
            y: 6,
          },
          {
            t: new Date("2020-5-11"),
            y: 3,
          },
        ],
      });
    }
  };

  return (
    <>
      <div>
        <h1> This is start page</h1>
        <div className="container-start-page">
          <div className="alerts box">
            active alerts
            {getAlerts}
          </div>
          <div className="jobs box">
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

            <ChartJobs {...jobsDone} />
          </div>
        </div>
      </div>
    </>
  );
}
