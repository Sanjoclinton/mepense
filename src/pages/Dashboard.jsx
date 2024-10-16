import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useAddTransactions } from "../hooks/useAddTransaction";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { transactions, summary } = useGetTransactions();

  return (
    <div className="bg-[#f0f1f3] flex flex-col h-screen max-h-[screen]">
      {/* Overview and profile container */}
      <div className="p-6 flex items-center justify-between bg-white h-[88px]">
        <h3 className="text-lg font-semibold">Overview</h3>
        <img
          src={user.photoURL}
          alt="profile picture"
          className="h-10 w-10 rounded-full"
        />
        <div>
          
        </div>
      </div>
      {/* Summary: Balances, expense & income */}
      <div className="summary-item px-6 py-10 flex gap-4 justify-between flex-nowrap overflow-scroll h-[201px]">
        {summary.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 flex-1 rounded-xl min-w-fit flex flex-col gap-3 ${
              index === 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <MdOutlineAccountBalanceWallet size={24} />
            <p className="text-xs">Total {item.title}</p>
            <h2 className="font-bold text-xl mt-2">${item.amount}</h2>
          </div>
        ))}
      </div>
      {/* Latest transactions */}
      <div className="flex-1 bg-white rounded-t-2xl px-6 py-10 border">
        {/* Expense and income only */}
        <div className="flex justify-center gap-6 mb-8">
          {["Expenses", "Income"].map((item) => (
            <button
              key={item}
              className="w-[100px] rounded-md px-4 py-2 border  text-black shadow-black/10 shadow-sm hover:bg-blue-600 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
        {/* Text and more */}
        <div className="flex-1 flex justify-between items-center">
          <h3 className="font-semibold ">Recent transactions</h3>
          <button className="border rounded-md p-0.5">
            {" "}
            <IoIosMore size={25} />
          </button>
        </div>
        {/* Transactions */}
        <div className="flex flex-col gap-6 mt-5 max-h-[27vh] lg:max-h-[24vh] overflow-scroll">
          {/* Show only 4 transactions */}
          {transactions &&
            transactions.map((transaction) => {
              const {
                transactionTitle,
                transactionAmount,
                transactionTime,
                transactionType,
                id,
              } = transaction;

              let time = transactionTime.toDate();
              time =
                time.getDate() +
                " " +
                time.toLocaleString("en-us", { month: "short" }) +
                " " +
                time.getFullYear();

              return (
                <div key={id} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold capitalize">
                      {transactionTitle}
                    </h3>
                    <p className="mt-1 text-xs">{time}</p>
                  </div>
                  <div className="text-end">
                    <h3 className="font-semibold">{`${
                      transactionType === "expense" ? "-" : "+"
                    } $${transactionAmount}`}</h3>
                    <p className="mt-1 text-xs">{transactionType}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Lower nav */}
      <div className="p-6 flex justify-between items-center mt-auto h-[96px]">
        <Link to="." className=" text-slate-400 ">
          <CiHome size={30} />
        </Link>
        <Link to="/add-transaction"
          className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
        >
          <IoAdd size={40} />
        </Link>
        <button className=" text-slate-400 ">
          <CiSettings size={30} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
