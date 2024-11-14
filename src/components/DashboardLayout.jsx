import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import { Wallet } from 'lucide-react';
import { useLogoutUser } from "../hooks/useLogoutUser";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { useGetUserTransactions } from "../hooks/useGetUserTransactions";
import {useGetUserSettings} from "../hooks/useGetUserSettings.js"
const DashboardLayout = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const { user } = useAuthContext();
  const { logoutUser } = useLogoutUser();
  const { summary } = useGetUserTransactions();
const {currency, imageUrl} = useGetUserSettings();

  // Early return if summary is empty
  if (!summary.length) return null;

  return (
    <div className="layout-outlet-custom-height flex flex-col">
      {/* Overview and Profile Section */}
      <header className="p-6 flex items-center justify-between bg-white h-[88px] relative">
        <h3 className="text-lg font-semibold">Overview</h3>
        <h2 className="font-bold text-lg">mepense</h2>
        <button
          onClick={() => setProfileToggle((prev) => !prev)}
          aria-expanded={profileToggle}
          className="focus:outline-none"
        >
          <img
            src={imageUrl || "/profile.png"}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </button>

        {/* Profile Dropdown */}
        {profileToggle && (
          <div className="absolute right-6 -bottom-20 px-5 py-4 min-w-44 bg-[#f0f1f3] text-sm shadow-black/20 shadow-md rounded-xl border text-left">
            <Link to="/settings">
              <p className="capitalize font-medium text-black/60 cursor-pointer">
                {user.displayName}
              </p>
            </Link>

            <button
              onClick={logoutUser}
              className=" bg-slate-200 font-bold mt-4 border rounded-md py-1 px-3 hover:bg-slate-300 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Summary Section: Balances, Expense & Income */}
      <section className="summary-item px-6 py-10 flex gap-3 justify-between md:justify-start flex-nowrap overflow-scroll h-[201px] no-scrollbar">
        {summary.map((item, index) => {
          let bgColor = "bg-white";

          if (item.title === "Expense") {
            bgColor = "bg-red-600 text-white";
          } else if (item.title === "Income") {
            bgColor = "bg-green-600 text-white";
          } else if (item.title === "Balance") {
            bgColor = "bg-blue-600 text-white";
          }

          return (
            <article
              key={item.id}
              className={`p-6 flex-1 lg:flex-[0] rounded-xl min-w-fit lg:min-w-56 flex flex-col gap-3 ${bgColor} transition-shadow duration-200 hover:shadow-lg`}
            >
              
              <div className="flex items-center gap-2">
              <Wallet size={22} />
                <p className="text-xs">Total {item.title}</p>
                {item.title === "Expense" && <IoIosArrowRoundUp size={15} />}
                {item.title === "Income" && <IoIosArrowRoundDown size={15} />}
              </div>

              <h2 className="font-bold text-xl mt-2">
                {item.amount < 0
                  ? `-${ currency}${Math.abs(item.amount).toLocaleString(
                      "default",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`
                  : `${ currency}${item.amount.toLocaleString("default", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </h2>
            </article>
          );
        })}
      </section>

      <section className="flex-1 overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
