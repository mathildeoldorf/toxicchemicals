import React, { useEffect, useState, useRef } from "react";
import Chartjs from "chart.js";

const ChartJobs = (props) => {
  const [chartState, setChartState] = useState(props);
  console.log(props);
  console.log(chartState);

  useEffect(() => {
    console.log(chartState);
  }, [chartState]);

  const chartConfig = {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: `Jobs completes`,
          data: props.dates,

          borderWidth: 1,
          pointStyle: "triangle",
          pointRadius: "10",
          pointBackgroundColor: "red",
        },
      ],
      pointStyle: "triangle",
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",
              stepSize: 1,
              displayFormat: "DD/MM/YY",
              tooltipFormat: "DD/MM/YY",
            },
            ticks: {
              major: {
                enabled: true,
                fontStyle: "bold",
                fontSize: 14,
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  console.log("start create chart");
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  console.log(chartInstance);
  const updateDataset = (datasetIndex, newData) => {
    if (chartInstance) {
      chartInstance.config.data.datasets[datasetIndex].data = newData;
      chartInstance.update();
    }
  };

  updateDataset(0, props.dates);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartJobs;
