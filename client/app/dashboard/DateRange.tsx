"use client";

import { MdOutlineCalendarToday, MdSwapHoriz } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";

type dateRangeProps = {
  setRange: any;
};

const DateRange = (props: dateRangeProps) => {
  const [selectedDate1, setSelectedDate1] = useState(undefined);
  const [selectedDate2, setSelectedDate2] = useState(undefined);

  useEffect(() => {
    props.setRange(selectedDate1, selectedDate2);
  }, [selectedDate1, selectedDate2]);

  const formatDate = (date: Date | any) => {
    if (date != undefined) {
      let fDate = "";
      fDate = fDate + date.getDate() + " ";
      fDate = fDate + monthNames[date.getMonth()] + " ";
      fDate = fDate + date.getFullYear();
      return fDate;
    }
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <div
        onClick={() => {
          var calendar = document.getElementById("calendar") as HTMLDivElement;
          var closeCalendar = document.getElementById(
            "closeCalendar"
          ) as HTMLDivElement;
          closeCalendar.classList.add("hidden");
          calendar.classList.toggle("hidden");
        }}
        id="closeCalendar"
        className="h-screen w-screen fixed top-0 left-0 bg-black opacity-80 z-[80] cursor-pointer hidden"
      ></div>
      <div
        id="calendar"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] hidden"
      >
        <Calendar
          selectedDate1={selectedDate1}
          selectedDate2={selectedDate2}
          setSelectedDate1={setSelectedDate1}
          setSelectedDate2={setSelectedDate2}
        />
      </div>
      <div className="relative flex flex-row items-center gap-2 z-[90]">
        <button
          onClick={() => {
            var calendar = document.getElementById(
              "calendar"
            ) as HTMLDivElement;
            var closeCalendar = document.getElementById(
              "closeCalendar"
            ) as HTMLDivElement;
            closeCalendar.classList.toggle("hidden");
            calendar.classList.toggle("hidden");
          }}
          className="hover:text-c11 p-2 border border-c10 rounded-md text-c12 text-[12px] flex flex-row items-center w-fit gap-2 relative cursor-pointer"
        >
          <MdOutlineCalendarToday className="w-4 h-4 " />
          {(() => {
            if (selectedDate1 || selectedDate2) {
              return (
                <>
                  <div className="w-[85px] ">
                    {formatDate(selectedDate1) && formatDate(selectedDate1)}
                    {formatDate(selectedDate1) == undefined && "--"}
                  </div>
                  <MdSwapHoriz className="w-5 h-5 " />
                  <div className="w-[85px]">
                    {formatDate(selectedDate2) && formatDate(selectedDate2)}
                    {formatDate(selectedDate2) == undefined && "--"}
                  </div>
                </>
              );
            } else {
              return (
                <h2 className="hover:text-c11 text-[12px]  w-[206px] ">
                  Select a Date Range
                </h2>
              );
            }
          })()}
        </button>
      </div>
    </>
  );
};

export default DateRange;
