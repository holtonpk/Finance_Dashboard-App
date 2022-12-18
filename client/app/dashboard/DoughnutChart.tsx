"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DoughnutChart = () => {
  const data = {
    labels: ["Income", "Outcome", "Savings"],
    datasets: [
      {
        data: [10, 70, 20],
        backgroundColor: ["#D255D1", "#2F66EE", "#FFC35A"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="relative grid items-center w-full h-full max-h-[100%] grid-cols-2 p-4 mx-auto overflow-hidden rounded-lg bg-c9">
      <div className="relative h-[90%]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-col justify-between h-[90%]">
        <div className="flex flex-row items-center gap-3">
          <div className="w-4 h-4 rounded-sm bg-c6 "></div>
          <h1 className="xl:text-sm text-[12px] text-c11 ">Income</h1>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="w-4 h-4 rounded-sm bg-c3 "></div>
          <h1 className="xl:text-sm text-[12px] text-c11 ">Outcome</h1>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="w-4 h-4 rounded-sm bg-c7 "></div>
          <h1 className="xl:text-sm text-[12px] text-c11 ">Savings</h1>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
