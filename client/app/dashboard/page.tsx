import React from "react";
import QuickView from "../components/QuickView/index";
import AccountStats from "./AccountStats";
import "../globals.css";
import Table from "./table/Table";
import Navbar from "../components/Navbar/index";
import UnlockMore from "../components/UnlockMore";
import FinancialRecord from "./FinancialRecord";

export default function DashboardPage() {
  return (
    <div className="flex flex-row w-screen ">
      <UnlockMore />
      <Navbar />
      <div className="w-full">
        <div className="flex flex-row gap-1">
          <div className="p-8 w-[80%] gap-4 flex flex-col ">
            <FinancialRecord />
            <AccountStats />
            <Table />
          </div>
          <QuickView />
        </div>
      </div>
    </div>
  );
}
