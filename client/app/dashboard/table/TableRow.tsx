"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { MdMoreVert } from "react-icons/md";
import { deleteTransaction, getAllTransactions } from "../../lib/api";
type transactionData = {
  id: string;
  date: string;
  description: string;
  amount: number;
  to_from: string;
  status: string;
};

type menuItemProps = {
  setSortedTransactions: any;
  data: transactionData;
  setSelectedRows: any;
  selectedRows: any[];
};

const TableRow = (props: menuItemProps) => {
  const [loading, setLoading] = useState(false);

  const clickRow = () => {
    const input = document.getElementById(
      props.data.id + "input"
    ) as HTMLDivElement;
    input.click();
  };

  const checkboxClick = () => {
    const checkBox = document.getElementById(
      props.data.id + "input"
    ) as HTMLInputElement;
    if (checkBox.checked) {
      props.setSelectedRows([...props.selectedRows, props.data.id]);
    } else {
      const newArray = props.selectedRows;
      const index = newArray.indexOf(props.data.id);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      props.setSelectedRows([...newArray]);
    }
  };

  useEffect(() => {
    const checkBox = document.getElementById(
      props.data.id + "input"
    ) as HTMLInputElement;
    checkBox.addEventListener("change", checkboxClick);
    return () => checkBox.removeEventListener("change", checkboxClick);
  });

  const showSuccessMessage = () => {
    let deleteSuccess = document.getElementById(
      "deleteSuccess"
    ) as HTMLDivElement;
    deleteSuccess.classList.remove("hidden");

    function hide() {
      deleteSuccess.classList.add("hidden");
    }

    setTimeout(hide, 3000);
  };

  async function deleteRow() {
    setLoading(true);
    await deleteTransaction(props.data.id);
    let newData = await getAllTransactions();

    setLoading(false);
    const prompt = document.getElementById(
      "prompt" + props.data.id
    ) as HTMLDivElement;
    prompt.classList.add("hidden");
    props.setSortedTransactions(newData);
    showSuccessMessage();
  }

  return (
    <>
      <div id={"prompt" + props.data.id} className="hidden">
        <div
          onClick={() => {
            const prompt = document.getElementById(
              "prompt" + props.data.id
            ) as HTMLDivElement;
            prompt.classList.add("hidden");
          }}
          className=" fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] "
        ></div>
        <div className=" fixed top-1/2  -translate-y-1/2 h-fit w-fit p-3 text-c11 bg-red left-1/2 -translate-x-1/2 rounded-lg bg-c10 flex flex-col items-center z-[80]">
          Delete selected record?
          <h1 className="text-[12px] text-c12">{"id:" + props.data.id}</h1>
          <span className="w-full h-[1px] bg-c11 my-2"></span>
          <div className="flex flex-row items-center gap-2  w-fit mx-auto">
            <button
              onClick={() => {
                const prompt = document.getElementById(
                  "prompt" + props.data.id
                ) as HTMLDivElement;
                prompt.classList.add("hidden");
              }}
              className="p-1 px-4 text-lg text-white rounded-lg hover:bg-c12  h-10 w-14"
            >
              No
            </button>
            <button
              onClick={deleteRow}
              className="p-1 px-4 text-lg text-white rounded-lg bg-c3  h-10 w-14"
            >
              {loading && <div className="load"></div>}
              {!loading && "Yes"}
            </button>
          </div>
        </div>
      </div>
      <div
        key={props.data.id}
        id={props.data.id}
        className="w-full px-3 py-2 text-sm cursor-pointer table-grid items-center hover:bg-c10 text-c12 hover:text-c11 border-b-[1px] border-c10"
      >
        <label className="container relative block text-sm cursor-pointer ">
          <input
            id={props.data.id + "input"}
            type="checkbox"
            className="optionCheckbox"
          />
          <span className="absolute w-5 h-5 -translate-y-1/2 border-2 rounded-md checkmark top-1/2 bg-c9 border-c12"></span>
        </label>
        <div
          id={"row" + props.data.id + "mid"}
          onClick={clickRow}
          className="table-grid-mid"
        >
          {(() => {
            var d = new Date(props.data.date);
            var month: number = d.getMonth() + 1;
            var day: string = d.getDate().toString().padStart(2, "0");
            var year: string = d.getFullYear().toString().substr(-2);
            var date = month + "/" + day + "/" + year;
            return <h1 className="w-full text-left">{date}</h1>;
          })()}
          <h1 className="w-full text-left">{props.data.description}</h1>

          <h1 className="w-full text-left text-c12">
            {props.data.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) + " USD"}
          </h1>

          <h1 className="w-full text-left">{props.data.to_from}</h1>
          <div className="w-full">
            {(() => {
              let status = props.data.status;

              if (status == "hold") {
                status = "On Hold";
              }

              return (
                <div
                  className={
                    "px-2 mx-auto text-left rounded-full capitalize w-fit float-left " +
                    props.data.status
                  }
                >
                  {status}
                </div>
              );
            })()}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button
            className="relative"
            onClick={() => {
              const row = document.getElementById(
                "row" + props.data.id + "mid"
              ) as HTMLDivElement;
              row.classList.toggle("opacity-0");

              const hiddenIcon = document.getElementById(
                "row" + props.data.id + "Hidden"
              ) as HTMLDivElement;
              hiddenIcon.classList.toggle("hidden");
              const input = document.getElementById(
                props.data.id + "input"
              ) as HTMLInputElement | null;
              if (input != null) {
                input.checked = false;
                input.disabled = !input.disabled;
              }
            }}
          >
            <div
              id={"row" + props.data.id + "Hidden"}
              className="absolute w-full h-[2px] rotate-45 -translate-x-1/2 -translate-y-1/2 bg-c12 top-1/2 left-1/2 hidden"
            ></div>
            <AiOutlineEye className="xl:w-6 xl:h-6 h-5 w-5" />
          </button>
          <button
            onClick={() => {
              const prompt = document.getElementById(
                "prompt" + props.data.id
              ) as HTMLDivElement;
              prompt.classList.remove("hidden");
            }}
          >
            <BiTrashAlt className="xl:w-6 xl:h-6 h-5 w-5" />
          </button>
          <button
            onClick={() => {
              const moreMenu = document.getElementById(
                "moreMenu" + props.data.id
              ) as HTMLDivElement;
              moreMenu.classList.toggle("hidden");
            }}
            className="relative w-fit h-fit "
          >
            <MdMoreVert className="xl:w-6 xl:h-6 h-5 w-5" />
            <div
              id={"moreMenu" + props.data.id}
              className="fade-in absolute hidden  p-1 text-[10px] px-2  bg-c9 border-[1px] border-c12 z-40 w-fit h-fit text-c12 whitespace-nowrap right-0 top-full"
            >
              This button does nothing
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default TableRow;
