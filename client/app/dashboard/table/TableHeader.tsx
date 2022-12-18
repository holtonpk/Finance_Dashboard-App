import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type TableHeaderProps = {
  title: string;
  id: string;
  sort: any;
  setSort: any;
  sortData: any;
  resetFilters: any;
};

const TableHeader = (props: TableHeaderProps) => {
  return (
    <button
      id={props.id}
      className="w-full text-base text-left  hover:bg-c10 text-c9 hover:text-c11 rounded-lg p-3 flex flex-row items-center gap-1"
      onClick={() => {
        let Icon = document.getElementById(props.id + "Icon") as HTMLDivElement;

        if (props.sort == undefined) {
          props.resetFilters();
          props.setSort("down");
          props.sortData(props.id, false);
        }

        if (props.sort == "up") {
          props.setSort("down");
          props.sortData(props.id, false);
          Icon.classList.remove("rotate-180");
        }
        if (props.sort == "down") {
          props.setSort("up");
          props.sortData(props.id, true);
          Icon.classList.add("rotate-180");
        }
      }}
    >
      <h2 className="text-c11">{props.title}</h2>
      <MdOutlineKeyboardArrowDown
        id={props.id + "Icon"}
        className="h-6 w-6 filterIcon"
      />
    </button>
  );
};

export default TableHeader;
