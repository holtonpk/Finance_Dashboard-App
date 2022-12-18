"use client";

import React, { useEffect, useState } from "react";
import Card from "../../dashboard/Card";
type selectedContactType = {
  name: string;
  userName: string;
  profilePic: string;
};

const allContacts = [
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

type SendMoneyProps = {
  setTransactionData: any;
};

const SendMoney = (props: SendMoneyProps) => {
  const [selectedContact, setSelectedContact] = useState<
    selectedContactType | undefined
  >(undefined);
  const [sendAmount, setSendAmount] = useState<number | undefined>(undefined);
  const [transactionType, setTransactionType] = useState("Send");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([
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
  ]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatInput = () => {
    const amountInput = document.getElementById(
      "amountInput"
    ) as HTMLInputElement;
    let neg = 1;
    if (transactionType == "Send") {
      neg = -1;
    }

    setSendAmount(parseInt(amountInput.value.replace("$", "")) * neg);
    amountInput.value = "$" + amountInput.value.replace("$", "");
    if (amountInput.value.replace("$", "") == "") {
      resetAmount();
    }
  };

  const resetAmount = () => {
    const amountInput = document.getElementById(
      "amountInput"
    ) as HTMLInputElement;
    setSendAmount(undefined);
    amountInput.value = "";
  };

  const openContact = () => {
    const selectContactMenu = document.getElementById(
      "selectContactMenu"
    ) as HTMLInputElement;
    selectContactMenu.classList.remove("hidden");
  };

  const searchContacts = () => {
    const recipientInput = document.getElementById(
      "recipientInput"
    ) as HTMLInputElement;

    var value = recipientInput.value;

    let results = [];
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.includes(value)) {
        results.push(contacts[i]);
      } else if (contacts[i].userName.includes(value)) {
        results.push(contacts[i]);
      }
    }
    if (value == "") {
      setContacts(allContacts);
    } else {
      setContacts(results);
    }
  };

  useEffect(() => {
    if (selectedContact !== undefined) {
      const amountInput = document.getElementById(
        "amountInput"
      ) as HTMLInputElement;

      amountInput.addEventListener("input", formatInput);

      return () => {
        amountInput.removeEventListener("input", formatInput);
      };
    } else {
      const recipientInput = document.getElementById(
        "recipientInput"
      ) as HTMLInputElement;
      recipientInput.addEventListener("click", openContact);
      recipientInput.addEventListener("input", searchContacts);
      return () => {
        recipientInput.removeEventListener("click", openContact);
        recipientInput.removeEventListener("input", searchContacts);
      };
    }
  });

  async function sendTransaction() {
    setLoading(true);

    let transactionTypeLocal = "Income";

    if (transactionType == "Request") {
      transactionTypeLocal = "Outcome";
    }

    let data = {
      date: new Date(),
      description: "Transfer",
      amount: sendAmount,
      to_from: selectedContact?.userName,
      status: "pending",
      transactionType: transactionTypeLocal,
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
    let sendMenu = document.getElementById("sendMenu") as HTMLDivElement;
    sendMenu.classList.add("hidden");
    resetAmount();

    let transferConfirmation = document.getElementById(
      "transferConfirmation"
    ) as HTMLDivElement;
    transferConfirmation.classList.remove("hidden");
  }

  const configButtons = () => {
    var sendButton = document.getElementById("sendButton") as HTMLButtonElement;
    var reqButton = document.getElementById("reqButton") as HTMLButtonElement;
    return (
      <div className="flex flex-row items-center w-fit gap-4">
        <button
          id="sendButton"
          onClick={() => {
            setTransactionType("Send");
            setSendAmount(undefined);
            sendButton.classList.add("transfer-Button-clicked");
            reqButton.classList.remove("transfer-Button-clicked");
            const amountInput = document.getElementById(
              "amountInput"
            ) as HTMLInputElement;
            amountInput.value = "";
          }}
          className=" text-c11 text-sm bg-c9 p-4 py-2 rounded-md flex flex-row items-center whitespace-nowrap gap-2  hover:bg-c3 transfer-Button-clicked"
        >
          <img src="/assets/sendMoneyIcon.svg" className=" h-6 w-6  " alt="" />
          Send
        </button>
        <button
          id="reqButton"
          onClick={() => {
            var sendButton = document.getElementById(
              "sendButton"
            ) as HTMLButtonElement;
            var reqButton = document.getElementById(
              "reqButton"
            ) as HTMLButtonElement;

            setTransactionType("Request");
            sendButton.classList.remove("transfer-Button-clicked");
            reqButton.classList.add("transfer-Button-clicked");
            setSendAmount(undefined);
            const amountInput = document.getElementById(
              "amountInput"
            ) as HTMLInputElement;
            amountInput.value = "";
          }}
          className="bg-c9 text-c11 text-sm  p-4 py-2 rounded-md flex flex-row items-center whitespace-nowrap gap-2  hover:bg-c3 "
        >
          <img src="/assets/reqMoneyIcon.svg" className="h-6 w-6  " alt="" />
          Request
        </button>
      </div>
    );
  };

  return (
    <div id="sendMenu" className="hidden">
      <div
        onClick={() => {
          let sendMenu = document.getElementById("sendMenu") as HTMLDivElement;
          sendMenu.classList.add("hidden");
          setLoading(false);
          resetAmount();
        }}
        className="h-screen w-screen fixed top-0 left-0 bg-black opacity-80 z-[80] cursor-pointer"
      ></div>
      <div className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-c10 rounded-lg h-fit w-[50%] max-w-[350px] z-[90] pt-20 pb-4">
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <Card background="cardBackground1" />
        </div>
        <div className="flex flex-col mx-auto w-[75%]  gap-4 items-center ">
          {configButtons()}
          {selectedContact && (
            <div
              onClick={() => {
                setSelectedContact(undefined);
              }}
              className="w-full contact-grid items-center  bg-c9 rounded-lg  p-2 justify-between h-16 relative hover:bg-c8 cursor-pointer"
            >
              <div className="rounded-full relative  h-10 w-10 bg-c12 overflow-hidden  box-content ">
                <img
                  src={selectedContact.profilePic}
                  className="w-[auto] h-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  object-cover	"
                />
              </div>
              <div className="flex flex-col  ">
                <h2 className="text-c11 text-base">{selectedContact.name}</h2>
                <h2 className="text-c12 text-[12px]">
                  {selectedContact.userName}
                </h2>
              </div>
              <div className="text-c3 text-[12px]">Change</div>
            </div>
          )}
          {selectedContact == undefined && (
            <div className="relative w-full">
              <input
                autoComplete="off"
                placeholder="Name, @username, phone, email"
                id="recipientInput"
                type="text"
                className=" text-left  text-c11 text-sm px-2 bg-c9  font-bold  w-full  rounded-lg p-2 h-16"
              />
              <div
                id="selectContactMenu"
                className="absolute w-full h-[200px] overflow-y-scroll top-full left-0 rounded-b-lg hidden z-40 "
              >
                {contacts.map((person, i) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedContact(person);
                      }}
                      key={i}
                      className="w-full contact-grid bg-c8  p-2 justify-between items-center h-16 hover:bg-c9 cursor-pointer"
                    >
                      <div className="rounded-full relative  h-10 w-10 bg-c12 overflow-hidden  box-content ">
                        <img
                          src={person.profilePic}
                          className="w-[auto] h-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  object-cover	"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <h2 className="text-c11 text-base">{person.name}</h2>
                        <h2 className="text-c12 text-[12px]">
                          {person.userName}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <input
            autoComplete="off"
            placeholder="$0"
            id="amountInput"
            type="money"
            className=" text-center  text-c11 text-3xl px-2 bg-c9  font-bold  w-full  rounded-lg p-2 h-16"
          />

          <div className="flex flex-col gap-2 items center w-full">
            {(() => {
              if (sendAmount == undefined) {
                return (
                  <button className="w-full bg-c3 opacity-20 text-c11 text-base font-bold rounded-lg py-3 cursor-not-allowed">
                    Enter amount
                  </button>
                );
              } else {
                return (
                  <button
                    onClick={sendTransaction}
                    className="w-full bg-c3  text-base font-bold rounded-lg py-3 relative text-c11 h-12"
                  >
                    {!loading &&
                      transactionType +
                        " " +
                        formatter.format(Math.abs(sendAmount))}
                    {loading && <div className="load2"></div>}
                  </button>
                );
              }
            })()}

            <button
              onClick={() => {
                let sendMenu = document.getElementById(
                  "sendMenu"
                ) as HTMLDivElement;
                sendMenu.classList.add("hidden");
                resetAmount();
                setLoading(false);
              }}
              className=" text-c12 text-sm hover:text-c11"
            >
              cancel transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
