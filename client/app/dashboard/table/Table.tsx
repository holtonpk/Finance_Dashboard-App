"use client";
import React, { useState, useEffect } from "react";
import DateRange from "../DateRange";
import TableRow from "./TableRow";
import { MdOutlineCheckCircle, MdOutlineClose } from "react-icons/md";
import TableHeader from "./TableHeader";

const Table = () => {
  const [dateSort, setDateSort] = useState<string | undefined>(undefined);
  const [amountSort, setAmountSort] = useState<string | undefined>(undefined);
  const [desSort, setDesSort] = useState<string | undefined>(undefined);
  const [toFromSort, setToFromSort] = useState<string | undefined>(undefined);
  const [statusSort, setStatusSort] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [rowsShowing, setRowsShowing] = useState(12);
  const [deleted, setDeleted] = useState<any[]>([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [transactionsAll, setTransactionsAll] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionsSet, setTransactionsSet] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  function resetFilters() {
    setDateSort(undefined);
    setAmountSort(undefined);
    setDesSort(undefined);
    setToFromSort(undefined);
    setStatusSort(undefined);

    let filterIcons = document.getElementsByClassName(
      "filterIcon"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < filterIcons.length; i++) {
      filterIcons[i].classList.remove("rotate-180");
    }
  }

  const sortData = (attribute: string, ascending: boolean) => {
    var unsortedArray = transactions;

    let sortedArray = [];
    if (ascending) {
      sortedArray = [...unsortedArray].sort((a, b) =>
        a[attribute] < b[attribute] ? -1 : 1
      );
    } else {
      sortedArray = [...unsortedArray].sort((a, b) =>
        a[attribute] > b[attribute] ? -1 : 1
      );
    }

    setSortedTransactions(sortedArray);
  };

  const setDateRange = (date1: any, date2: any) => {
    let sortedArray: any = [];
    if (date1 && date2) {
      for (let i = 0; i < transactionsAll.length; i++) {
        if (
          new Date(transactionsAll[i]["date"]) >= new Date(date1) &&
          new Date(transactionsAll[i]["date"]) <= new Date(date2)
        ) {
          sortedArray.push(transactionsAll[i]);
        }
      }
      setTransactions(sortedArray);
      setSortedTransactions(sortedArray);
    } else if (!date1 && !date2) {
      setTransactions(transactionsAll);
      setSortedTransactions(transactionsAll);
    } else if (date1) {
      for (let i = 0; i < transactionsAll.length; i++) {
        if (new Date(transactionsAll[i]["date"]) >= new Date(date1)) {
          sortedArray.push(transactionsAll[i]);
        }
      }
      setTransactions(sortedArray);
      setSortedTransactions(sortedArray);
    }
  };

  const groupData = (attribute: string, ascending: boolean) => {
    var unsortedArray = transactions;

    let sortedArray: any = [];

    for (let i = 0; i < unsortedArray.length; i++) {
      let att = unsortedArray[i][attribute];

      for (let j = 0; j < unsortedArray.length; j++) {
        if (unsortedArray[j][attribute] == att) {
          if (!sortedArray.includes(unsortedArray[j])) {
            sortedArray.push(unsortedArray[j]);
          }
        }
      }
    }

    if (ascending) {
      setSortedTransactions(sortedArray);
    } else {
      setSortedTransactions(sortedArray.reverse());
    }
  };

  const cancelPrompt = () => {
    const selectPrompt = document.getElementById(
      "selectPrompt"
    ) as HTMLDivElement;
    selectPrompt.classList.add("hidden");
    const gapMenu = document.getElementById("gapMenu") as HTMLDivElement;
    gapMenu.classList.remove("hidden");
  };

  const getPos = () => {
    const gapMenu = document.getElementById("gapMenu") as HTMLDivElement;
    const tableBody = document.getElementById("tableBody") as HTMLDivElement;
    let bodyY = tableBody.getBoundingClientRect().top + window.scrollY;
    let gapY = gapMenu.getBoundingClientRect().top + window.scrollY;
    if (!gapMenu.classList.contains("hidden")) {
      if (gapY < bodyY) {
        gapMenu.style.visibility = "hidden";
      } else {
        gapMenu.style.visibility = "visible";
      }
    }
  };

  useEffect(() => {
    if (!transactionsSet) {
      fetch("http://localhost:5000/data/transactions/all")
        .then((res) => res.json())
        .then((transactions) => {
          setSortedTransactions(transactions["items"]);
          setTransactions(transactions["items"]);
          setTransactionsAll(transactions["items"]);
          setTransactionsSet(true);
        });
    }

    const gapMenu = document.getElementById("gapMenu") as HTMLDivElement;

    // document.addEventListener("scroll", getPos);

    if (selectedRows.length > 0 && gapMenu.classList.contains("hidden")) {
      gapMenu.classList.remove("hidden");
    } else if (selectedRows.length == 0) {
      gapMenu.classList.add("hidden");
    }
  }, [selectedRows]);

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
    let deletedIDs = [];
    const mainCheck = document.getElementById("mainCheck") as HTMLInputElement;
    setLoading(true);

    for (let i = 0; i < selectedRows.length; i++) {
      // await deleteTransaction(selectedRows[i]);

      fetch("http://localhost:5000/deleteTransaction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedRows[i] }),
      });

      deletedIDs.push(selectedRows[i]);
    }

    fetch("http://localhost:5000/data/transactions/all")
      .then((res) => res.json())
      .then((transactions) => {
        setSortedTransactions(transactions["items"]);
        setTransactions(transactions["items"]);
        setTransactionsAll(transactions["items"]);
        setTransactionsSet(true);
      });

    setLoading(false);

    for (let i = 0; i < selectedRows.length; i++) {
      let row = document.getElementById(selectedRows[i]) as HTMLInputElement;
      if (row) {
        row.classList.add("hide");
      }
    }
    mainCheck.checked = false;

    const selectPrompt = document.getElementById(
      "selectPrompt"
    ) as HTMLDivElement;
    selectPrompt.classList.add("hidden");

    showSuccessMessage();
    setDeleted([...deleted, deletedIDs]);
    setSelectedRows([]);
  }

  return (
    <>
      <div
        id="deleteSuccess"
        className="hidden bg-c1 p-3 w-fit flex rounded-lg flex-row items-center fixed z-[80] left-1/2  -translate-x-1/2 top-[90%] -translate-y-1/2"
      >
        <MdOutlineCheckCircle className="h-6 w-6 fill-c11" />
        <div className="h-5 w-[1px] bg-c12 mx-3"></div>
        <h2 className="text-lg text-c11 whitespace-nowrap mr-16">
          Successfully deleted the selected records.
        </h2>
        <button
          onClick={() => {
            let deleteSuccess = document.getElementById(
              "deleteSuccess"
            ) as HTMLDivElement;
            deleteSuccess.classList.add("hidden");
          }}
        >
          <MdOutlineClose className="h-5 w-5 fill-c12" />
        </button>
      </div>

      <div id="selectPrompt" className="hidden">
        <div
          onClick={cancelPrompt}
          className=" fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] "
        ></div>
        <div className=" fixed top-1/2  -translate-y-1/2 h-fit w-fit p-3 text-c11 bg-red left-1/2 -translate-x-1/2 rounded-lg bg-c10 flex flex-col items-center z-[80]">
          {selectedRows.length > 1 && "Delete selected records?"}
          {selectedRows.length == 1 && "Delete selected record"}
          <h1 className="text-[12px] text-c12">
            {selectedRows.length + " selected"}
          </h1>
          <span className="w-full h-[1px] bg-c11 my-2"></span>
          <div className="flex flex-row items-center gap-2  w-fit mx-auto">
            <button
              onClick={cancelPrompt}
              className="p-1 px-4 text-lg text-white rounded-lg hover:bg-c12  h-10 w-14"
            >
              No
            </button>
            <button
              onClick={deleteRow}
              className="p-1 px-4 text-lg text-white rounded-lg bg-c3 h-10 w-14"
            >
              {loading && <div className="load"></div>}
              {!loading && "Yes"}
            </button>
          </div>
        </div>
      </div>

      <div
        id="gapMenu"
        className="left-1/2 hidden -translate-x-1/2 top-[90%] -translate-y-1/2 w-fit gap-16 p-2 px-6 justify-between text-base bg-c9 border-2 border-c12 flex flex-row items-center fixed z-[60] rounded-full"
      >
        <div className="flex flex-row gap-6 items-center">
          <div className="text-c11 flex flex-row gap-1">
            Selected <h1 className="font-bold">{selectedRows.length}</h1>
            {(() => {
              if (selectedRows.length > 1) {
                return "records";
              } else {
                return "record";
              }
            })()}
          </div>
          <button
            onClick={() => {
              const checkMarks = document.getElementsByClassName(
                "optionCheckbox"
              ) as HTMLCollectionOf<HTMLInputElement> | null;

              const mainCheck = document.getElementById(
                "mainCheck"
              ) as HTMLInputElement | null;

              if (mainCheck != null && checkMarks != null) {
                for (let i: number = 0; i < checkMarks.length; i++) {
                  checkMarks[i].checked = false;
                }
              }
              const gapMenu = document.getElementById(
                "gapMenu"
              ) as HTMLDivElement;
              gapMenu.classList.add("hidden");

              setSelectedRows([]);
            }}
            className="border-[1px] border-c11 p-1 px-2 text-c11 rounded-md text-sm"
          >
            Reset
          </button>
        </div>
        <button
          onClick={() => {
            const selectPrompt = document.getElementById(
              "selectPrompt"
            ) as HTMLDivElement;
            selectPrompt.classList.remove("hidden");
            const gapMenu = document.getElementById(
              "gapMenu"
            ) as HTMLDivElement;
            gapMenu.classList.add("hidden");
          }}
          className="text-c2 whitespace-nowrap"
        >
          Delete Selected
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-c11">Transactions</h1>

        <DateRange setRange={setDateRange} />
      </div>
      <div
        id="tableBody"
        className="w-full pt-2   border-c9 border-[2px] p-1 rounded-xl h-fit   bg-c9 slide-in-bck-bottom"
      >
        <div className="w-full px-3 py-2 table-grid border-b-[1px] border-b-c12 ">
          <label className="container relative block text-sm cursor-pointer ">
            <input
              type="checkbox"
              className="optionCheckbox"
              id="mainCheck"
              onClick={() => {
                const checkMarks = document.getElementsByClassName(
                  "optionCheckbox"
                ) as HTMLCollectionOf<HTMLInputElement> | null;

                const mainCheck = document.getElementById(
                  "mainCheck"
                ) as HTMLInputElement | null;

                if (mainCheck != null && checkMarks != null) {
                  if (!mainCheck.checked) {
                    for (let i: number = 0; i < checkMarks.length; i++) {
                      checkMarks[i].checked = false;
                    }
                    setSelectedRows([]);
                  } else {
                    for (let i: number = 1; i < checkMarks.length; i++) {
                      checkMarks[i].checked = true;
                      setSelectedRows((selectedRows) => [
                        ...selectedRows,
                        checkMarks[i].id.replace("input", ""),
                      ]);
                    }
                  }
                }
              }}
            />
            <span className="absolute w-5 h-5 -translate-y-1/2 border-2 rounded-md checkmark top-1/2 bg-c9 border-c12"></span>
          </label>

          <div className="table-grid-mid">
            <TableHeader
              resetFilters={resetFilters}
              title="Date"
              id="date"
              sort={dateSort}
              setSort={setDateSort}
              sortData={sortData}
            />

            <TableHeader
              resetFilters={resetFilters}
              title="Description"
              id="description"
              sort={desSort}
              setSort={setDesSort}
              sortData={groupData}
            />

            <TableHeader
              resetFilters={resetFilters}
              title="Amount"
              id="amount"
              sort={amountSort}
              setSort={setAmountSort}
              sortData={sortData}
            />
            <TableHeader
              resetFilters={resetFilters}
              title="To/From"
              id="to_from"
              sort={toFromSort}
              setSort={setToFromSort}
              sortData={groupData}
            />
            <TableHeader
              resetFilters={resetFilters}
              title="Status"
              id="status"
              sort={statusSort}
              setSort={setStatusSort}
              sortData={groupData}
            />
          </div>
          <h1 className="w-full text-base text-left text-c11  p-3">Action</h1>
        </div>
        {transactionsSet &&
          sortedTransactions.map((transaction, i) => {
            if (i < rowsShowing) {
              return (
                <div key={transaction["id"]}>
                  <TableRow
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    data={transaction}
                    setSortedTransactions={setSortedTransactions}
                  />
                </div>
              );
            }
          })}
        <div className="w-full relative  flex items-center  py-8 ">
          <button
            className="px-8 py-2 w-fit text-xl font-bold text-c11 hover:bg-c10 rounded-lg absolute left-1/2 -translate-x-1/2 "
            onClick={() => {
              setRowsShowing(rowsShowing + 12);
            }}
          >
            Load more (12)
          </button>

          {rowsShowing > 12 && (
            <button
              className=" w-fit text-sm font-bold text-c12 hover:text-c11 rounded-lg absolute left-10   "
              onClick={() => {
                setRowsShowing(12);
              }}
            >
              show less
            </button>
          )}

          <h1 className="text-lg text-c12 float-right absolute left-[95%] -translate-x-full whitespace-nowrap">
            {"Showing " + rowsShowing + " of " + sortedTransactions.length}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Table;
