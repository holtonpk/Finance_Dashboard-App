"use client";

import React from "react";
import LineChart from "./LineChart";
import Doughnut from "./DoughnutChart";
import SavingsTarget from "./SavingsTarget";

const AccountStats = () => {
  return (
    <div className="mb-4 accountStats-Grid h-[300px] ">
      <div className="w-full p-4 rounded-lg  h-[300px] bg-c9 ">
        <LineChart />
      </div>
      <div className="flex flex-col justify-between w-full h-[300px] gap-2  ">
        <div className="w-full h-[10%] flex flex-row justify-between">
          <h1 className="text-2xl text-c11 ">Analytics</h1>
          <button
            onClick={() => {
              let thisElement = document.getElementById(
                "unlockMore"
              ) as HTMLDivElement;

              thisElement.classList.remove("hidden");
            }}
            className="text-sm text-c12 "
          >
            View More
          </button>
        </div>
        <div className="grid  grid-rows-2 gap-4 h-[85%]">
          <Doughnut />
          <SavingsTarget />
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
