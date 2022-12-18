"use client";

import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type propType = {
  name: string;
  defaultFilter: string;
  width: string;
  onChange: any;
  icon: React.ReactNode;
  filters: any[];
};

const DropDownMenu = (props: propType) => {
  const [filterType, setFilterType] = useState(props.defaultFilter);

  const selectDropdown = (item: string) => {
    const filterDropDown = document.getElementById(
      "filterDropDown" + props.name
    ) as HTMLDivElement;
    filterDropDown.classList.toggle("hidden");

    const dropDownIcon = document.getElementById(
      "dropDownIcon" + props.name
    ) as HTMLDivElement;
    dropDownIcon.classList.toggle("rotate-180");

    setFilterType(item);
  };

  return (
    <div className={"relative  " + props.width}>
      <button
        onClick={() => {
          const filterDropDown = document.getElementById(
            "filterDropDown" + props.name
          ) as HTMLDivElement;

          filterDropDown.classList.toggle("hidden");
          const dropDownIcon = document.getElementById(
            "dropDownIcon" + props.name
          ) as HTMLDivElement;
          dropDownIcon.classList.toggle("rotate-180");
        }}
        className="flex flex-row border-c12 border-[1px] justify-between rounded-lg w-full text-[12px] px-2  py-1 text-c12 gap-3 items-center h-fit"
      >
        <div className="flex flex-row items-center w-fit gap-3">
          {props.icon}
          {filterType}
        </div>
        <MdOutlineKeyboardArrowDown
          id={"dropDownIcon" + props.name}
          className="w-6 h-6 fill-c11"
        />
      </button>
      <div
        id={"filterDropDown" + props.name}
        className="absolute fade-in flex flex-col w-full h-fit z-40 hidden border-[2px] border-c8"
      >
        {props.filters.map((filter, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                selectDropdown(filter.title);
                props.onChange(filter.attribute, filter.attribute2);
              }}
              className="flex flex-row items-center gap-10 p-1 px-3 text-sm bg-c8 text-c11 hover:bg-c9"
            >
              {filter.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropDownMenu;
