import React, { useEffect, useState, useRef } from "react";
import Chartjs from "chart.js";

const ChartWarehouse = (props) => {
  const [chartState, setChartState] = useState(props);
  console.log(props);
  console.log(chartState);

  const warehouse = Object.values(props).pop();
  console.log(warehouse);
  const letters = Object.keys(props);
  const values = Object.values(props);

  letters.pop();
  values.pop();

  console.log(letters, values);

  const chartConfig = {
    type: "bar",
    data: {
      labels: letters,
      datasets: [
        {
          label: `Warehouse# ${warehouse}`,
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
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

  // console.log(chartContainer);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartWarehouse;
