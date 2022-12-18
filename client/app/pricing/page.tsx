"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import { TiLeaf } from "react-icons/ti";
import { BsCheck, BsLightningCharge } from "react-icons/bs";
import { IoRibbonOutline } from "react-icons/io5";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import Header from "../components/Header";
const PricingPage = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(true);

  const changePaymentTerm = (e: Event) => {
    let paymentTermSelector = document.getElementById(
      "paymentTermSelector"
    ) as HTMLInputElement;

    if (paymentTermSelector.checked) {
      setMonthlyPayment(false);
    } else {
      setMonthlyPayment(true);
    }
    const optionContainer = document.getElementById(
      "optionContainer"
    ) as HTMLDivElement;
    optionContainer.classList.remove("slide-in-bottom");
    void optionContainer.offsetHeight;
    optionContainer.classList.add("slide-in-bottom");
  };
  useEffect(() => {
    let paymentTermSelector = document.getElementById(
      "paymentTermSelector"
    ) as HTMLInputElement;
    paymentTermSelector.addEventListener("change", changePaymentTerm);

    return () =>
      paymentTermSelector.removeEventListener("change", changePaymentTerm);
  });

  const paymentPlans = [
    {
      title: "Lite",
      icon: <TiLeaf className="w-6 h-6 fill-c3" />,
      description: " Perfect to get started",
      price: { m: 11, y: 100 },
      includes: [
        "Realtime analytics",
        "SMS Notifications",
        "Unlimited transfers",
      ],
    },
    {
      title: "Pro",
      icon: <IoRibbonOutline className="w-6 h-6 text-c3" />,
      description: "Best for entrepreneurs",
      price: { m: 25, y: 250 },

      includes: [
        "Accurate forecasting models",
        "Mobile App",
        "Chat Widget",
        "Unlimited crypto withdraw",
      ],
    },
    {
      title: "Ultimate",
      icon: <BsLightningCharge className="w-6 h-6 fill-c3" />,
      description: "Great for small businesses",
      price: { m: 50, y: 500 },
      includes: [
        "24 hours support",
        "AI Virtual assistant",
        "Daily performance reports",
        "Ad spend tools",
      ],
    },
  ];

  return (
    <>
      <Header page="Pricing" />
      <div className="relative h-screen ">
        <div className="z-40 flex flex-col items-center -full h-screen gap-10 p-10 ">
          <div className="flex flex-col items-center gap-2">
            <div className="relative pb-6 text-5xl text-c11">
              <img
                src="/assets/underline.svg"
                className="absolute  w-[50%] bottom-0 left-full -translate-x-full"
              />
              Ready to get started?
            </div>
            <h2 className="text-xl text-c12 w-fit">
              Choose a plan tailored for your needs
            </h2>
          </div>
          <div className="flex flex-row items-center gap-3 relative">
            {(() => {
              let text = "text-c12";
              if (monthlyPayment) {
                text = "text-c11";
              }
              return <h1 className={"text-2xl " + text}>Monthly</h1>;
            })()}

            <label className="switch">
              <input id="paymentTermSelector" type="checkbox" />
              <span className="slider round"></span>
            </label>

            {(() => {
              let text = "text-c12";
              if (!monthlyPayment) {
                text = "text-c11";
              }
              return <h1 className={"text-2xl " + text}>Yearly</h1>;
            })()}

            <div className=" absolute -top-6 -right-16  grid grid-cols-2 ">
              <h2 className="text-c3 bg-c220 px-1 text-[12px] h-fit ">
                20% OFF
              </h2>
              <HiOutlineArrowUturnRight className="h-10 w-10 text-c3 rotate-[160deg] mt-2 " />
            </div>
          </div>
          <div
            id="optionContainer"
            className="grid grid-cols-3 gap-8 w-[85%] h-fit slide-in-bottom"
          >
            {paymentPlans.map((option, i) => {
              return (
                <div
                  key={i}
                  className="relative flex flex-col justify-between w-full h-full gap-6 p-6 pb-10 cursor-pointer bg-c9 rounded-xl hover:bg-c10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                      {option.icon}
                      <h1 className="text-2xl font-bold text-c11">
                        {option.title}
                      </h1>
                    </div>
                    <h1 className="text-sm text-c12">{option.description}</h1>
                  </div>
                  <div className="flex flex-row items-end ">
                    <h1 className="bottom text-7xl text-c12 ">$</h1>

                    {(() => {
                      if (monthlyPayment) {
                        return (
                          <>
                            <h1 className="bottom text-7xl text-c11">
                              {option.price.m}
                            </h1>
                            <h1 className="pb-2 text-sm bottom text-c12">
                              /Month
                            </h1>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <h1 className="bottom text-7xl text-c11">
                              {option.price.y}
                            </h1>
                            <h1 className="pb-2 text-sm bottom text-c12">
                              /Year
                            </h1>
                          </>
                        );
                      }
                    })()}
                  </div>
                  <button className="w-full p-3 px-10 text-sm text-center rounded-lg bg-c3 text-c11">
                    Get started
                  </button>
                  <div className="flex flex-col gap-2 h-[200px] ">
                    <h1 className="text-sm font-bold text-c11">
                      {option.title + " includes:"}
                    </h1>
                    {option.includes.map((feature, j) => {
                      return (
                        <div
                          key={j}
                          className="flex flex-row items-center gap-2 text-sm text-c12"
                        >
                          <BsCheck className="w-8 h-8 fill-c3" />
                          {feature}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
