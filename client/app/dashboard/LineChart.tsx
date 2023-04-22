"use client";

import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getRelativePosition } from "chart.js/helpers";
import { nbrElmSpdDecChar, nbrSnbrElmSpdDecChar } from "../lib/usefulScripts";
Chart.register(...registerables);

const LineChart = () => {
  type dataType = {
    accountTotal: number | undefined;
    data: number[] | undefined;
    labels: string[] | undefined;
    startValue: number | undefined;
  };

  const [dataSet, setDataSet] = useState(false);
  const [timeFrame, setTimeFrame] = useState("1y");
  const [data, setData] = useState<dataType>({
    accountTotal: undefined,
    data: undefined,
    labels: undefined,
    startValue: undefined,
  });

  const removeCursor = () => {
    let cursor = document.getElementById("cursor") as HTMLDivElement;
    cursor.classList.add("hidden");
    setValues();
  };

  const chartRef = useRef<Chart>(null);

  async function setD() {
    await fetch("http://localhost:5000/data/transactions/1y")
      .then((res) => res.json())
      .then((data) => {
        console.log("dd===>", JSON.stringify(data));
        setData(data);
        nbrElmSpdDecChar(
          data["accountTotal"],
          document.getElementById("hoverValue") as HTMLDivElement,
          1000,
          false,
          "$"
        );
        setChangeValueDisplay(
          data["accountTotal"] - data["startValue"],
          data["startValue"]
        );
      });
  }

  useEffect(() => {
    if (!dataSet) {
      setD();
      setDataSet(true);
    }
    let chartContainer = document.getElementById(
      "chartContainer"
    ) as HTMLDivElement;
    chartContainer.addEventListener("mouseleave", removeCursor);
    return () => chartContainer.addEventListener("mouseleave", removeCursor);
  }, [dataSet]);

  const chartData = {
    labels: data.labels,

    datasets: [
      {
        label: "Income",
        data: data.data,
        fill: false,
        lineTension: 0.2,
        borderColor: "#2F66EE",
      },
    ],
  };

  const setChangeValueDisplay = (amountChangeValue: any, startValue: any) => {
    let percentChangeValue: any = (
      (amountChangeValue / startValue) *
      100
    ).toFixed(2);

    let color = "#21BE6C";
    let pre = "+";
    if (amountChangeValue < 0) {
      color = "#E60000";
      pre = "";
    }

    let percentChange = document.getElementById(
      "percentChangeValue"
    ) as HTMLDivElement;

    percentChange.innerHTML =
      pre +
      formatter.format(amountChangeValue) +
      " (" +
      percentChangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      ")" +
      "%";
    percentChange.style.color = color;
  };

  const options = {
    events: ["mousemove"],
    onHover: (e: any) => {
      let chart: any = chartRef.current;
      const canvasPosition = getRelativePosition(e, chart);
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      let pointLocation = chart.getDatasetMeta(0).data[dataX];
      if (pointLocation && data.data && data.labels) {
        let hoverValue = document.getElementById(
          "hoverValue"
        ) as HTMLDivElement;

        nbrSnbrElmSpdDecChar(
          data.data[dataX],
          parseInt(hoverValue.innerHTML.replace("$", "").replace(",", "")),
          hoverValue,
          1000,
          false,
          "$"
        );

        let cursor = document.getElementById("cursor") as HTMLDivElement;
        cursor.classList.remove("hidden");

        let cursorText = document.getElementById(
          "cursorText"
        ) as HTMLDivElement;
        let cursorPoint = document.getElementById(
          "cursorPoint"
        ) as HTMLDivElement;
        cursorPoint.style.top = pointLocation.y + "px";
        cursorPoint.style.transform = "translate(-50%, -50%)";
        cursor.style.left = canvasPosition.x - cursor.offsetWidth / 2 + "px";
        let month = monthNames[new Date(data.labels[dataX]).getMonth()];
        let date: any = new Date(data.labels[dataX]).getDate();
        let year: any =
          " " +
          new Date(data.labels[dataX]).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Denver",
          });
        if (timeFrame == "1y" || timeFrame == "3y" || timeFrame == "3m") {
          year = new Date(data.labels[dataX]).getFullYear();
        }

        cursorText.innerHTML = month + " " + date + "," + year;
        setChangeValueDisplay(data.data[dataX] - data.data[0], data.data[0]);
      }
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        enabled: false,
      },

      hover: {
        mode: "index",
        intersect: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
          // color: "#0F0F0F",
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
          // color: "#0F0F0F",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        borderWidth: 0,
      },
    },
  };

  const setValues = () => {
    if (data.accountTotal && data.startValue) {
      let hoverValue = document.getElementById("hoverValue") as HTMLDivElement;

      nbrSnbrElmSpdDecChar(
        data["accountTotal"],
        parseInt(hoverValue.innerHTML.replace("$", "").replace(",", "")),
        hoverValue,
        1000,
        false,
        "$"
      );
      setChangeValueDisplay(
        data["accountTotal"] - data["startValue"],
        data["startValue"]
      );
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  var monthNames = [
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

  async function selectTime(elem: string) {
    let buttons = document.getElementsByClassName(
      "Time-chart"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("selectedTime-chart");
    }
    let selectedButton = document.getElementById("Time-chart-" + elem);
    selectedButton?.classList.add("selectedTime-chart");

    await fetch("http://localhost:5000/data/transactions/" + elem)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        nbrElmSpdDecChar(
          data["accountTotal"],
          // data[1][data.length - 1],
          document.getElementById("hoverValue") as HTMLDivElement,
          1000,
          false,
          "$"
        );
      });

    setTimeFrame(elem);
    removeCursor();
  }

  return (
    <div className="flex flex-col justify-start ">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-2xl text-c11 font-bold">Cash Flow</h1>

          <h1 id="hoverValue" className="text-3xl font-bold text-c11">
            --
          </h1>
          <h1 id="percentChangeValue" className="text-[12px] font-bold ">
            --
          </h1>
        </div>
        <div className="flex flex-row w-fit h-fit gap-4">
          <button
            id="Time-chart-1w"
            onClick={() => selectTime("1w")}
            className="pb-2 text-sm font-bold text-c11  hover:text-c3 Time-chart box-border"
          >
            1W
          </button>
          <button
            id="Time-chart-1m"
            onClick={() => selectTime("1m")}
            className=" pb-2 text-sm font-bold text-c11 hover:text-c3 Time-chart border-box box-border"
          >
            1M
          </button>
          <button
            id="Time-chart-3m"
            onClick={() => selectTime("3m")}
            className=" pb-2 text-sm font-bold text-c11 hover:text-c3 Time-chart box-border"
          >
            3M
          </button>
          <button
            id="Time-chart-1y"
            onClick={() => selectTime("1y")}
            className=" pb-2 text-sm font-bold text-c11 hover:text-c3 Time-chart box-border selectedTime-chart"
          >
            1Y
          </button>
          <button
            id="Time-chart-3y"
            onClick={() => selectTime("3y")}
            className=" pb-2 text-sm font-bold text-c11 hover:text-c3 Time-chart box-border"
          >
            3Y
          </button>
        </div>
      </div>

      <div
        id="chartContainer"
        className="h-full overflow-hidden  rounded-lg  relative mt-4  pt-4 "
      >
        <div
          id="cursor"
          className="flex flex-col items-center absolute z-[80] pointer-events-none h-full	hidden"
        >
          <div
            id="cursorText"
            className="text-sm text-c12 whitespace-nowrap -top-5 absolute"
          >
            --
          </div>
          <div className="w-[1px] h-full bg-c12 relative">
            <div
              id="cursorPoint"
              className="h-3 w-3 rounded-full bg-c3 top-1/2 absolute left-1/2 -translate-x-1/2 border-2 border-c9"
            ></div>
          </div>
        </div>
        <Line data={chartData} options={options} ref={chartRef} />
      </div>
    </div>
  );
};

export default LineChart;
