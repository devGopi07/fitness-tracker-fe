import React, { useEffect, useState } from "react";
 

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    }, 
  },
};

export function DataC({ dates }) {
  let [arr, setArr] = useState([]);
  let [countarr, setCountarr] = useState([]);

  {
    dates.map((d, v) => {
      arr.push(d.date);
      countarr.push(d.count);
    });
  }

  const labels = arr;
  const dataPoints = countarr;
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "No of Workouts",
        data: dataPoints,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-outer">
      <div className="chart-div">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
