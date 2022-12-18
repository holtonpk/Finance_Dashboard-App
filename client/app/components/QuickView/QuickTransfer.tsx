"use client";

import React, { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
type recType = {
  name: string;
  userName: string;
  profilePic: string;
};

type QuickTransferProps = {
  setTransactionData: any;
};

const QuickTransfer = (props: QuickTransferProps) => {
  const [sendAmount, setSendAmount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [transferRecipient, setTransferRecipient] = useState<
    recType | undefined
  >(undefined);

  const contacts = [
    {
      name: "Mike",
      userName: "@mike_money12",
      profilePic: "/assets/p4.jpg",
    },
    {
      name: "Steve",
      userName: "@123steve",
      profilePic: "/assets/p2.jpg",
    },
    {
      name: "Molly",
      userName: "@ms_molly12",
      profilePic: "/assets/p3.jpg",
    },
    {
      name: "Sally",
      userName: "@silly_sally62",
      profilePic: "/assets/p1.jpg",
    },
  ];
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatInput = () => {
    const amountInput = document.getElementById(
      "qsAmountInput"
    ) as HTMLInputElement;
    setSendAmount(parseInt(amountInput.value.replace("$", "")) * -1);
    amountInput.value = "$" + amountInput.value.replace("$", "");
    if (amountInput.value.replace("$", "") == "") {
      resetAmount();
    }
  };

  const resetAmount = () => {
    const amountInput = document.getElementById(
      "qsAmountInput"
    ) as HTMLInputElement;
    setSendAmount(undefined);
    amountInput.value = "";
  };

  useEffect(() => {
    if (transferRecipient !== undefined) {
      const amountInput = document.getElementById(
        "qsAmountInput"
      ) as HTMLInputElement;
      amountInput.addEventListener("input", formatInput);
      return () => amountInput.removeEventListener("input", formatInput);
    }
  });

  async function sendTransaction() {
    setLoading(true);

    let transactionTypeLocal = "Income";

    let data = {
      date: new Date(),
      description: "Transfer",
      amount: sendAmount,
      to_from: transferRecipient?.userName,
      status: "pending",
      transactionType: "Outcome",
    };

    const response = await fetch("http://localhost:5000/createTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    props.setTransactionData(data);

    setLoading(false);
    setTransferRecipient(undefined);
    resetAmount();

    let transferConfirmation = document.getElementById(
      "transferConfirmation"
    ) as HTMLDivElement;
    transferConfirmation.classList.remove("hidden");
  }

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-row justify-between w-full  items-center ">
        <h1 className="text-xl xl:text-2xl font-bold text-c11 whitespace-nowrap">
          Quick Send
        </h1>
        <button className=" h-fit w-fit">
          <MdMoreVert className="xl:h-5 xl:w-5 h-4 w-4 fill-c11" />
        </button>
      </div>

      <div className="rounded-lg h-fit w-full max-w-[350px] z-[90] height-transition  ">
        {/* {renderSelected(transferRecipient)} */}

        {transferRecipient && (
          <div className="h-[180px] w-[170px]  xl:w-[200px]">
            <div
              id="qsSelectedContact"
              onClick={() => {
                setTransferRecipient(undefined);
                setSendAmount(undefined);
              }}
              className="w-full relative contact-grid items-center rounded-t-lg  bg-c10 border-b-[1px] border-c12 h-[60px] p-2 justify-between  hover:bg-c3 cursor-pointer hover:text-c11 text-c3"
            >
              <div className="rounded-full relative  h-8 w-8 xl:h-10 xl:w-10 bg-c12 overflow-hidden  box-content ">
                <img
                  src={transferRecipient.profilePic}
                  className="w-[auto] h-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  object-cover	"
                />
              </div>
              <div className="flex flex-col  ">
                <h2 className="text-c11 text-sm">{transferRecipient.name}</h2>
                <h2 className="text-c12 text-[10px]">
                  {transferRecipient.userName}
                </h2>
              </div>
              <div className="absolute top-[45%] -translate-x-1/2 left-[85%] text-[8px]">
                Change
              </div>
            </div>
            <input
              autoComplete="off"
              placeholder="$0"
              id="qsAmountInput"
              type="money"
              className=" text-center  text-c11 xl:text-3xl text-2xl px-2 bg-c10  font-bold  w-full    h-[60px]"
            />
            <div className="flex flex-col  items center ">
              {sendAmount == undefined && (
                <button className="w-full bg-c3 opacity-20 text-c11 text-sm xl:text-base font-bold rounded-b-lg py-3 h-[50px] cursor-not-allowed">
                  Enter amount
                </button>
              )}
              {sendAmount && (
                <button
                  onClick={sendTransaction}
                  className="relative w-full bg-c3 text-c11 text-base font-bold rounded-b-lg py-3 h-[50px] "
                >
                  {!loading && "Send " + formatter.format(Math.abs(sendAmount))}
                  {loading && <div className="load2"></div>}
                </button>
              )}

              <button
                onClick={() => {
                  let sendMenu = document.getElementById(
                    "sendMenu"
                  ) as HTMLDivElement;
                  sendMenu.classList.add("hidden");
                  resetAmount();
                  setTransferRecipient(undefined);
                }}
                className=" text-c12 text-sm hover:text-c11 h-[10px]"
              >
                cancel transaction
              </button>
            </div>
          </div>
        )}

        {transferRecipient == undefined && (
          <div
            id="qsSelectContactMenu"
            className="relative  h-[240px] overflow-y-scroll  rounded-lg  z-40 w-[170px] xl:w-[200px]"
          >
            {contacts.map((person, i) => (
              <div
                onClick={() => {
                  setTransferRecipient(person);
                }}
                key={i}
                className="w-full contact-grid bg-c10 h-[60px]  p-2 justify-between items-center  hover:bg-c3 cursor-pointer"
              >
                <div className="rounded-full relative  xl:h-10 xl:w-10 h-8 w-8 bg-c12 overflow-hidden  box-content ">
                  <img
                    src={person.profilePic}
                    className="w-[auto] h-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  object-cover	"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-c11 text-sm">{person.name}</h2>
                  <h2 className="text-c11 text-[10px]">{person.userName}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTransfer;
