"use client";

import React, { useState } from "react";
import QuickTransfer from "./QuickTransfer";
import { AiOutlineBank } from "react-icons/ai";
import { FaRegMoneyBillAlt, FaBitcoin, FaRegChartBar } from "react-icons/fa";
import { TbSend, TbDownload } from "react-icons/tb";
import { MdMoreVert } from "react-icons/md";
import AccountBalance from "./AccountBalance";
import SendMoney from "./SendMoney";
import TransferConfirmation from "./TransferConfirmation";

import Wallet from "./Wallet";
const QuickView = () => {
  const [transactionData, setTransactionData] = useState(undefined);

  return (
    <>
      <SendMoney setTransactionData={setTransactionData} />
      <TransferConfirmation data={transactionData} />
      <div className="right-0 h-screen  bg-c9 pt-6  w-[20%] sticky top-0 flex flex-col gap-8 p-4 justify-start overflow-hidden ">
        <AccountBalance />
        <Wallet />
        <div className="hidden">
          <div className="w-full h-[10%] flex flex-row items-center justify-between mb-4">
            <h1 className="text-base text-c11 whitespace-nowrap ">Assets</h1>
            <button className="text-[12px] text-c12 whitespace-nowrap">
              View More
            </button>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="w-full border-c10 border-[1px] rounded-lg p-1 flex flex-row h-fit gap-3 items-center hover:bg-c10 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-c10">
                <AiOutlineBank className="w-5 h-5 fill-c11" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[12px] text-c12">Bank</h1>

                <h1 className="text-base text-c11">1,523k USD</h1>
              </div>
            </div>
            <div className="w-full border-c10 border-[1px] rounded-lg p-1 flex flex-row h-fit gap-3 items-center hover:bg-c10 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-c10">
                <FaRegMoneyBillAlt className="w-5 h-5 fill-c11" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[12px] text-c12">Cash</h1>

                <h1 className="text-base text-c11">473k USD</h1>
              </div>
            </div>
            <div className="w-full border-c10 border-[1px] rounded-lg p-1 flex flex-row h-fit gap-3 items-center hover:bg-c10 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-c10">
                <FaRegChartBar className="w-5 h-5 fill-c11" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[12px] text-c12">Investments</h1>

                <h1 className="text-base text-c11">812k USD</h1>
              </div>
            </div>
            <div className="w-full border-c10 border-[1px] rounded-lg p-1 flex flex-row h-fit gap-3 items-center hover:bg-c10 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-c10">
                <FaBitcoin className="w-5 h-5 fill-c11" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[12px] text-c12">Crypto</h1>

                <h1 className="text-base text-c11">473k USD</h1>
              </div>
            </div>
          </div>
        </div>
        <QuickTransfer setTransactionData={setTransactionData} />
        <div className="flex flex-col gap-2 hidden">
          <div className="flex flex-row justify-between w-full  items-center ">
            <h1 className="text-2xl font-bold text-c11 whitespace-nowrap">
              Quick Transfer
            </h1>
            <button className="bg-c10 rounded-lg p-1 h-fit w-fit">
              <MdMoreVert className="h-5 w-5 fill-c11" />
            </button>
          </div>
          <div className="flex flex-col gap-2 ">
            <h2 className="text-c12 text-sm">Card Number</h2>
            <input
              type="text"
              className="w-full bg-c9 rounded-lg h-10 text-c11 text-lg px-4 border-c10 border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-c12 text-sm">Amount</h2>
            <div className="flex flex-row gap-2 items-center h-10 ">
              <input
                type="text"
                className="w-full  rounded-lg h-full bg-c9 text-c11 text-lg px-4 border-c10 border-[1px]"
              />
              <button className="bg-c10 rounded-lg p-2 h-fit w-fit">
                <TbDownload className="h-5 w-5 text-c11" />
              </button>
              <button className="bg-c1 rounded-lg p-2 h-fit w-fit">
                <TbSend className="h-5 w-5 text-c11" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuickView;
