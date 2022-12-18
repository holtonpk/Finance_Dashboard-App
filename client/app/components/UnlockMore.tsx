"use client";

import React from "react";
import { GiPadlockOpen } from "react-icons/gi";
import Link from "next/link";
const UnlockMore = () => {
  return (
    <div id="unlockMore" className="hidden">
      <div
        onClick={() => {
          let thisElement = document.getElementById(
            "unlockMore"
          ) as HTMLDivElement;

          thisElement.classList.add("hidden");
        }}
        className="h-screen w-screen fixed bg-black opacity-80 z-[80] cursor-pointer"
      ></div>
      <div className="flex flex-col items-center p-8 rounded-lg bg-c10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90]">
        <div className="flex items-center justify-center p-3 mb-3 rounded-lg bg-c3">
          <GiPadlockOpen className="w-12 h-12 fill-c11" />
        </div>
        <h1 className="mb-1 text-xl text-c11 whitespace-nowrap">
          Unlock All Features
        </h1>

        <h1 className="text-lg text-c12  whitespace-nowrap mb-3">
          Manage your assets like a pro
        </h1>
        <Link
          href="/pricing"
          className="p-2 px-6 text-lg whitespace-nowrap rounded-lg bg-c3 text-c11"
        >
          Upgrade to premium
        </Link>
      </div>
    </div>
  );
};

export default UnlockMore;
