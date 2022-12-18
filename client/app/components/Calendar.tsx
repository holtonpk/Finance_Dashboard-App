"use client";

import { calendarPickerSkeletonClasses } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { RiH2 } from "react-icons/ri";
import { formatDiagnosticsWithColorAndContext } from "typescript";
import "../styles/calendar.css";

type calendarProps = {
  selectedDate1: any | undefined;
  selectedDate2: any | undefined;
  setSelectedDate1: any;
  setSelectedDate2: any;
};

const Calendar = (props: calendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedElement1, setSelectedElement1] = useState(1);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthForward = () => {
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    let dayButtons = document.getElementsByClassName(
      "dayButton"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < dayButtons.length; i++) {
      dayButtons[i].classList.remove("selectedDay");
      dayButtons[i].classList.remove("selectedRange");
    }
  };
  const monthBack = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    let dayButtons = document.getElementsByClassName(
      "dayButton"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < dayButtons.length; i++) {
      dayButtons[i].classList.remove("selectedDay");
      dayButtons[i].classList.remove("selectedRange");
    }
  };

  const selectDay = (date: Date, element: HTMLButtonElement) => {
    let dayButtons = document.getElementsByClassName(
      "dayButton"
    ) as HTMLCollectionOf<HTMLElement>;

    if (props.selectedDate1 == undefined) {
      element.classList.add("selectedDay");
      props.setSelectedDate1(date);

      setSelectedElement1(parseInt(element.id.replace("dayButton", "")));
    } else if (props.selectedDate2 == undefined) {
      if (date < props.selectedDate1) {
        props.setSelectedDate2(props.selectedDate1);
        props.setSelectedDate1(date);
      } else {
        props.setSelectedDate2(date);
      }

      element.classList.add("selectedDay");
      let selectedElement2 = parseInt(element.id.replace("dayButton", ""));
      if (selectedElement2 > selectedElement1) {
        for (let i = selectedElement1 + 1; i < selectedElement2; i++) {
          let dayButton = document.getElementById(
            "dayButton" + i
          ) as HTMLButtonElement;
          dayButton.classList.add("selectedRange");
        }
      } else {
        for (let i = selectedElement1 - 1; i > selectedElement2; i--) {
          let dayButton = document.getElementById(
            "dayButton" + i
          ) as HTMLButtonElement;
          dayButton.classList.add("selectedRange");
        }
      }
    } else {
      props.setSelectedDate1(undefined);
      props.setSelectedDate2(undefined);
      for (let i = 0; i < dayButtons.length; i++) {
        dayButtons[i].classList.remove("selectedDay");
        dayButtons[i].classList.remove("selectedRange");
      }
    }
  };

  const configDays = () => {
    let totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();

    let prevMonthTotalDays =
      new Date(currentYear, currentMonth, 0).getDate() + 1 - firstDay;

    let days = 1;
    let daysNextMonth = 1;

    let dayButtons = document.getElementsByClassName(
      "dayButton"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < dayButtons.length; i++) {
      dayButtons[i].innerHTML = "";
    }

    for (let i = 0; i < 42; i++) {
      let dayButton = document.getElementById(
        "dayButton" + i
      ) as HTMLButtonElement;

      if (i < firstDay) {
        dayButton.innerHTML = prevMonthTotalDays.toLocaleString();
        dayButton.style.color = "#787878";
        let date = new Date(currentYear, currentMonth - 1, prevMonthTotalDays);
        ConfigRange(dayButton, date);

        dayButton.onclick = () => selectDay(date, dayButton);

        prevMonthTotalDays++;
      } else if (i >= firstDay && days <= totalDays) {
        dayButton.style.color = "#FEFEFE";
        dayButton.innerHTML = days.toLocaleString();
        let date = new Date(currentYear, currentMonth, days);
        dayButton.onclick = () => selectDay(date, dayButton);
        ConfigRange(dayButton, date);

        days++;
      } else if (days > totalDays) {
        dayButton.innerHTML = daysNextMonth.toLocaleString();
        dayButton.style.color = "#787878";
        let date = new Date(currentYear, currentMonth + 1, daysNextMonth);
        ConfigRange(dayButton, date);

        dayButton.onclick = () => selectDay(date, dayButton);

        daysNextMonth++;
      }
    }
  };

  const ConfigRange = (dayButton: HTMLButtonElement, date: Date) => {
    if (formatDate(date) == formatDate(new Date())) {
      dayButton.classList.add("today");
      dayButton.style.color = "#2F66EE";
    }
    if (
      formatDate(date) == formatDate(props.selectedDate1) ||
      formatDate(date) == formatDate(props.selectedDate2)
    ) {
      dayButton.classList.add("selectedDay");
    } else if (
      new Date(date) > new Date(props.selectedDate1) &&
      new Date(date) < new Date(props.selectedDate2)
    ) {
      dayButton.classList.add("selectedRange");
    }
  };

  const formatDate = (date: Date | any) => {
    if (date != undefined) {
      let fDate = "";
      fDate = fDate + date.getMonth() + "/";
      fDate = fDate + date.getDate() + "/";
      fDate = fDate + date.getFullYear();
      return fDate;
    }
  };

  useEffect(() => {
    configDays();
  }, [currentMonth, currentYear, props.selectedDate1, props.selectedDate2]);

  return (
    <div className="relative z-[90]  p-3 h-[300px] gap-3 w-[300px] bg-c10 rounded-lg flex flex-col">
      <div className="flex flex-row items center justify-between w-full ">
        <h1 className="text-c11 text-lg font-bold">
          {monthNames[currentMonth] + " " + currentYear}
        </h1>
        <div className="flex flex-row gap-2 w-fit">
          <button onClick={monthBack}>
            <MdKeyboardArrowLeft className="h-5 w-5 fill-c11" />
          </button>
          <button onClick={monthForward}>
            <MdKeyboardArrowRight className="h-5 w-5 fill-c11" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-c12 text-sm text-center">
        {dayNames.map((name, i) => (
          <h1 key={i}>{name}</h1>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 h-full grid-rows-6 text-c11 text-sm text-center items-center">
        {[...Array(42)].map((x, i) => {
          return (
            <button
              key={i}
              id={"dayButton" + i}
              className=" dayButton hover:bg-c3 rounded-sm h-full w-full"
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
