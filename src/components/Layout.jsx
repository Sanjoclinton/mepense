import React from "react";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import RefreshServiceWorker from "./RefreshServiceWorker";

const Layout = () => {
  return (
    <div className="bg-[#f0f1f3] flex flex-col h-dvh">
      <Outlet />
      {/* Lower nav */}
      <div className="p-6 flex justify-between items-center h-[96px] sm:mx-auto sm:w-[600px] ">
        <Link to="/dashboard" className=" text-slate-400 lower-nav">
          <CiHome size={30} />
        </Link>
        <Link to="/dashboard/expenses" className=" text-slate-400 lower-nav">
          <IoIosArrowRoundUp size={30} />
        </Link>

        <Link
          to="/add-transaction"
          className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
        >
          <IoAdd size={40} />
        </Link>
        <Link to="/dashboard/incomes" className=" text-slate-400 lower-nav">
          <IoIosArrowRoundDown size={30} />
        </Link>
        <Link to="settings" className=" text-slate-400 lower-nav">
          <CiSettings size={30} />
        </Link>
      </div>
      <RefreshServiceWorker />
    </div>
  );
};

export default Layout;
