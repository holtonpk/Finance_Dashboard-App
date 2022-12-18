"use client";

import React, { useEffect, useState } from "react";
import "../../styles/odometer.css";
import { nbrElmSpdDecChar } from "../../lib/usefulScripts";
import { MdAttachMoney } from "react-icons/md";

const AccountBalance = () => {
  const [accountTotal, setAccountTotal] = useState(undefined);

  useEffect(() => {
    if (!accountTotal) {
      fetch("http://localhost:5000/data/transactions/all")
        .then((res) => res.json())
        .then((total) => {
          setAccountTotal(total["totalAmount"]);
          nbrElmSpdDecChar(
            total["totalAmount"],
            accountBalance,
            2000,
            false,
            ""
          );
          nbrElmSpdDecChar(42, accountBalanceDec, 2000, false, ".");
        });
    }

    const accountBalance = document.getElementById(
      "accountBalance"
    ) as HTMLDivElement;

    const accountBalanceDec = document.getElementById(
      "accountBalanceDec"
    ) as HTMLDivElement;
  });

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-[12px] text-c11">Total Balance</h1>

      <div className="flex flex-row items-end justify-start relative ">
        <MdAttachMoney className="fill-c3 xl:h-12 xl:w-12 h-8 w-8  absolute top-1/2 -translate-y-1/2" />

        <div
          id="accountBalance"
          className="xl:text-4xl text-3xl font-bold text-c3 flex flex-row  h-fit xl:ml-10 ml-6"
        >
          --
        </div>
        <div id="accountBalanceDec" className="text-xl  text-c3 "></div>
      </div>
      <div className="flex flex-row items-center w-fit gap-4 mt-3">
        <button
          onClick={() => {
            var sendMenu = document.getElementById(
              "sendMenu"
            ) as HTMLDivElement;
            sendMenu.classList.remove("hidden");
          }}
          className=" text-c11 xl:text-[12px] text-[10px] p-2 pr-4 py-2 rounded-md flex flex-row items-center whitespace-nowrap gap-2   bg-c10 hover:bg-c3"
        >
          <img
            src="/assets/sendMoneyIcon.svg"
            className=" xl:h-5 xl:w-5 h-4 w-4 "
            alt=""
          />
          Send
        </button>
        <button
          onClick={() => {
            var sendMenu = document.getElementById(
              "sendMenu"
            ) as HTMLDivElement;
            sendMenu.classList.remove("hidden");
          }}
          className=" text-c11 xl:text-[12px] text-[10px]  p-2 pr-4 py-2 rounded-md flex flex-row items-center whitespace-nowrap gap-2   bg-c10  hover:bg-c3"
        >
          <img
            src="/assets/reqMoneyIcon.svg"
            className=" xl:h-5 xl:w-5 h-4 w-4"
            alt=""
          />
          Request
        </button>
      </div>
    </div>
  );
};

export default AccountBalance;
