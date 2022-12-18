import React from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import Confetti from "react-confetti";

type confirmProps = {
  data: any;
};

const TransferConfirmation = (props: confirmProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div id="transferConfirmation" className="hidden">
      <div
        onClick={() => {
          let transferConfirmation = document.getElementById(
            "transferConfirmation"
          ) as HTMLDivElement;
          transferConfirmation.classList.add("hidden");
        }}
        className="h-screen w-screen fixed top-0 left-0 bg-black opacity-80 z-[60] cursor-pointer"
      ></div>

      {props.data && (
        <>
          <div
            onClick={() => {
              let transferConfirmation = document.getElementById(
                "transferConfirmation"
              ) as HTMLDivElement;
              transferConfirmation.classList.add("hidden");
            }}
            className="z-[70] fixed top-0 left-0"
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              colors={[
                "#21BE6C",
                "#E60000",
                "#2F66EE",
                "#FFC35A",
                "#FB8871",
                "#D255D1",
              ]}
            />
          </div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] z-[100] w-[550px] fade-in">
            <img
              src="/assets/ticket.svg"
              className="w-full h-full absolute"
              alt=""
            />

            <div className="flex flex-col items-center absolute top-2  left-1/2 -translate-x-1/2">
              <MdOutlineCheckCircle className="h-16 w-16 fill-c3" />
              <h1 className="text-4xl text-c3 font-bold text-center whitespace-nowrap">
                Payment Successful!
              </h1>
              <h1 className="text-base text-c12 font-bold text-center whitespace-nowrap">
                {"Transaction id: " + props.data["@collectionId"]}
              </h1>
            </div>
            <div className="flex flex-col items-center absolute top-[55%]  left-1/2 -translate-x-1/2 w-[60%] h-[35%] justify-between">
              <div className="flex flex-row items center w-full justify-between">
                <h1 className="text-xl text-c11  text-center whitespace-nowrap">
                  Payment Type
                </h1>
                <h1 className="text-xl text-c11  text-center whitespace-nowrap">
                  {props.data.transactionType}
                </h1>
              </div>
              <div className="flex flex-row items center w-full justify-between">
                <h1 className="text-xl text-c11  text-center whitespace-nowrap">
                  Recipient
                </h1>
                <h1 className="text-xl text-c11  text-center whitespace-nowrap">
                  {props.data.to_from}
                </h1>
              </div>
              <div className="flex flex-row items center w-full justify-between">
                <h1 className="text-xl text-c11 font-bold text-center whitespace-nowrap">
                  Amount
                </h1>
                <h1 className="text-xl text-c11 font-bold text-center whitespace-nowrap">
                  {formatter.format(parseInt(props.data.amount))}
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransferConfirmation;
