"use client";

import React, { useEffect } from "react";
import { MdTrendingUp, MdMoreVert } from "react-icons/md";
import { nbrElmSpdDecChar } from "../lib/usefulScripts";

const FinancialRecord = () => {
  useEffect(() => {
    const box1 = document.getElementById("box0") as HTMLDivElement;
    const box2 = document.getElementById("box1") as HTMLDivElement;
    const box3 = document.getElementById("box2") as HTMLDivElement;
    nbrElmSpdDecChar(12499, box1, 2000, false, "$");
    nbrElmSpdDecChar(1231, box2, 2000, false, "$");
    nbrElmSpdDecChar(120982, box3, 2000, false, "$");
    const box1Percent = document.getElementById("box0P") as HTMLDivElement;
    const box2Percent = document.getElementById("box1P") as HTMLDivElement;
    const box3Percent = document.getElementById("box2P") as HTMLDivElement;
    nbrElmSpdDecChar(7.2, box1Percent, 2000, true, "");
    nbrElmSpdDecChar(10.3, box2Percent, 2000, true, "");
    nbrElmSpdDecChar(6.11, box3Percent, 2000, true, "");
  });

  const moreButton = (elem: string) => {
    let moreMenu = document.getElementById(elem) as HTMLDivElement;
    moreMenu.classList.toggle("hidden");
  };

  const boxes = [
    {
      title: "Total Income",
      value: 12499,
      percent: 7.2,
    },
    {
      title: "Total Expense",
      value: 1231,
      percent: 10.3,
    },
    {
      title: "Total Savings",
      value: 120982,
      percent: 6.11,
    },
  ];

  return (
    <div className="flex flex-col mb-4 items-center w-full">
      <div className="w-full  flex flex-row gap-6 ">
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className="bg-c9 w-full h-fit rounded-lg p-4  px-6 flex flex-col gap-1 "
            >
              <div className="flex flex-row items-center justify-between">
                <h1 className="xl:text-xl text-lg text-c12">{box.title}</h1>
                <button
                  onClick={() => moreButton("moreMenu" + i)}
                  className="relative"
                >
                  <MdMoreVert className="h-5 w-5 fill-c12" />
                  <div
                    id={"moreMenu" + i}
                    className="fade-in absolute hidden  p-1 text-[10px] px-2  bg-c9 border-[1px] border-c12 z-40 w-fit h-fit text-c12 whitespace-nowrap right-0 top-full"
                  >
                    This button does nothing
                  </div>
                </button>
              </div>
              <div
                id={"box" + i}
                className="xl:text-4xl text-3xl text-c11 font-bold "
              >
                --
              </div>
              <div className="flex flex-row gap-2 ">
                <div className="flex flex-row text-c1 items-center xl:text-base text-sm w-[70px]">
                  <MdTrendingUp className="h-4 w-4 mr-2" />
                  <div id={"box" + i + "P"}>--</div>%
                </div>
                <h2 className=" text-c12 whitespace-nowrap xl:text-base text-sm">
                  from last week
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialRecord;
