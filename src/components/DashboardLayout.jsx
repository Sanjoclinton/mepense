import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useLogoutUser } from "../hooks/useLogoutUser";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { useSetCurrency } from "../hooks/useSetCurrency";

const DashboardLayout = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const { user } = useAuthContext();
  const { logoutUser } = useLogoutUser();
  const { summary } = useGetTransactions();
  const { currency } = useSetCurrency();

  // Early return if summary is empty
  if (!summary.length) return null;

  return (
    <div>
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
            src={user.photoURL || "/profile.png"}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </button>

        {/* Profile Dropdown */}
        {profileToggle && (
          <div className="absolute right-6 -bottom-20 px-5 py-4 min-w-44 bg-[#f0f1f3] text-sm shadow-black/20 shadow-md rounded-xl border text-left">
            <p className="capitalize font-medium text-black/60">{user.displayName}</p>
            <button
              onClick={logoutUser}
              className="text-white bg-red-600 font-bold mt-4 border rounded-md py-1 px-3 hover:bg-red-700 transition-colors duration-200"
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
              <MdOutlineAccountBalanceWallet size={24} />
              <div className="flex items-center gap-2">
                <p className="text-xs">Total {item.title}</p>
                {item.title === "Expense" && <IoIosArrowRoundUp size={15} />}
                {item.title === "Income" && <IoIosArrowRoundDown size={15} />}
              </div>

              <h2 className="font-bold text-xl mt-2">
                {item.amount < 0
                  ? `-${currency}${Math.abs(item.amount).toLocaleString("default", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : `${currency}${item.amount.toLocaleString("default", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </h2>
            </article>
          );
        })}
      </section>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
