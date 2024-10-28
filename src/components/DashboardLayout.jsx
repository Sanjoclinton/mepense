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

  return (
    <div>
      {/* overview and Profile */}
      <div className="p-6 flex items-center justify-between bg-white h-[88px] relative">
        <h3 className="text-lg font-semibold">Overview</h3>
        <h2 className="font-bold text-2xl">mepense</h2>
        <img
          onClick={() => setProfileToggle((prev) => !prev)}
          src={user.photoURL || "/profile.png"}
          alt="profile picture"
          className="h-10 w-10 rounded-full"
        />

        <div
          className={`absolute right-6 -bottom-20 px-5 py-4 min-w-44 bg-[#f0f1f3] text-sm shadow-black/20 shadow-md rounded-xl border text-left ${
            profileToggle ? "block" : "hidden"
          }`}
        >
          <p className="capitalize font-medium text-black/60">
            {user.displayName}
          </p>
          <button
            onClick={logoutUser}
            className={`text-black/80 font-bold mt-4 border rounded-md py-1 px-3 hover:bg-slate-100 hover:text-black`}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Summary: Balances, expense & income */}
      <div className="summary-item px-6 py-10 flex gap-3 justify-between md:justify-start flex-nowrap overflow-scroll h-[201px]">
        {summary.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 flex-1 lg:flex-[0] rounded-xl min-w-fit lg:min-w-56 flex flex-col gap-3 ${
              index === 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <MdOutlineAccountBalanceWallet size={24} />
            <div className="flex items-center gap-2">
              <p className="text-xs">Total {item.title}</p>
              {item.title === "Expense" && <IoIosArrowRoundUp size={15} />}
              {item.title === "Income" && <IoIosArrowRoundDown size={15} />}
            </div>

            <h2 className="font-bold text-xl mt-2">
              {item.amount < 0
                ? `-${currency}${Math.abs(
                    item.amount.toLocaleString("default", {
                      minimumFractionDigits: 2,
                      maximunFractionDigits: 2,
                    })
                  )}`
                : `${currency}${item.amount.toLocaleString("default", {
                    minimumFractionDigits: 2,
                    maximunFractionDigits: 2,
                  })}`}
            </h2>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
