import React from "react";
import MenuItem from "./MenuItem";
import {
  MdOutlineSpaceDashboard,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { BiTrendingUp, BiTransfer } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="sticky top-0 max-w-[250px] items-center flex flex-col w-1/5 h-screen bg-c9 text-c11 border-r-[1px] border-r-c12">
      <div className="relative w-full h-20 pt-3 pl-4 text-2xl">
        <div className="flex flex-row ">
          <h1 className="text-2xl font-bold text-c3">On</h1>

          <h1 className="text-2xl font-bold text-c11">point</h1>
        </div>
      </div>
      <div className="relative flex flex-col w-full gap-4 h-fit ">
        <MenuItem
          title="Dashboard"
          dropDown={false}
          icon={<MdOutlineSpaceDashboard className="w-7 h-7" />}
          available={true}
        />
        <MenuItem
          title="Analytics"
          dropDown={false}
          icon={<BiTrendingUp className="w-7 h-7" />}
          available={false}
        />
        <MenuItem
          title="Transfers"
          dropDown={true}
          icon={<BiTransfer className="w-7 h-7 rotate-90" />}
          subCategory={[
            { title: "Send Money", link: "/" },
            { title: "Deposit Money", link: "/" },
          ]}
          available={false}
        />
        <MenuItem
          title="Notifications"
          dropDown={false}
          icon={<MdOutlineNotificationsNone className="w-7 h-7" />}
          available={false}
        />
      </div>
      <div className="absolute bottom-0 flex flex-col justify-between w-full px-4 py-3 h-fit border-t-[1px] border-c10">
        <div className="w-full  rounded-lg p-3 flex flex-row h-fit gap-3 items-center">
          <div className="w-10 h-10 rounded-lg bg-c10 relative overflow-hidden">
            <img
              src="/assets/profilePic.png"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col h-10">
            <h1 className="text-base text-c11">Bill Smith</h1>
            <h1 className="text-[12px] text-c12">abcd123@gmail.com</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
