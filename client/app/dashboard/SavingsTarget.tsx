"use client";

import React, { useEffect } from "react";
import { nbrElmSpdDecChar } from "../lib/usefulScripts";

const SavingsTarget = () => {
  const savingsTarget = 25000;
  const savingsTotal = 17250;

  const percent = Math.round((savingsTotal / savingsTarget) * 100);

  useEffect(() => {
    const percentBar = document.getElementById("percentBar") as HTMLDivElement;
    percentBar.style.width = percent.toLocaleString() + "%";

    const savingsTotalElement = document.getElementById(
      "savingsTotal"
    ) as HTMLDivElement;
    nbrElmSpdDecChar(savingsTotal / 1000, savingsTotalElement, 2000, true, "");
    const savingsTargetElement = document.getElementById(
      "savingsTarget"
    ) as HTMLDivElement;
    nbrElmSpdDecChar(
      savingsTarget / 1000,
      savingsTargetElement,
      2000,
      true,
      ""
    );
    const savingsPercent = document.getElementById(
      "savingsPercent"
    ) as HTMLDivElement;
    nbrElmSpdDecChar(percent, savingsPercent, 2000, false, "");
  });

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 rounded-lg  bg-c9">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold text-c11">Savings Target</h1>
        <div className="p-1 text-[12px] px-2 rounded-full text-c9 bg-c1 flex flex-row ">
          <div id="savingsPercent">--</div>%
        </div>
      </div>
      <div className="w-[100%] h-4 rounded-full bg-c12 relative">
        <div
          id="percentBar"
          className="relative left-0 w-0 h-4 rounded-full bg-c3 animateWidth"
        ></div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="xl:text-sm text-[12px] font-bold text-c11 flex flex-row ">
          <div id="savingsTotal">--</div> k USD
        </div>
        <div className="xl:text-sm text-[12px] font-bold text-c12  flex flex-row ">
          <div id="savingsTarget">--</div> k USD
        </div>
      </div>
    </div>
  );
};

export default SavingsTarget;
