"use client";

import React from "react";

type accountProps = {
  accounts: any[];
};

const Accounts = (props: accountProps) => {
  return (
    <div>
      <div className=" h-[10%] flex flex-row justify-between w-fit gap-6 mb-3 items-center">
        <h1 className="text-2xl text-c11 ">Savings Goals</h1>
        <button className="text-sm text-c12 ">View More</button>
      </div>

      <div className="grid w-full grid-cols-3 gap-4 mb-4">
        {props.accounts.map((account, i) => {
          return (
            <button
              key={i}
              className="flex flex-col w-full gap-2 p-4 rounded-lg h-fit bg-c9 hover:bg-c10"
            >
              <h1 className="text-sm font-bold text-left text-c12">
                {account.name}
              </h1>
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-xl font-bold text-left text-c11">
                  {Math.round(account.value / 1000) + "k USD"}
                </h1>
                <h2 className=" px-2 text-[12px] h-fit  bg-c1 text-c8 rounded-full">
                  +7%
                </h2>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Accounts;
