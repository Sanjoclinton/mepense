import React, { useState } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const AllTransactions = () => {
  const { transactions } = useGetTransactions();

  const handleDeleteTransaction = async (id) => {
    const transactionDocRef = doc(db, "transactions", id);
    await deleteDoc(transactionDocRef);
  };

  return (
    <div>
      <div className="p-6 flex items-center bg-white h-[88px]">
        <Link to="/dashboard">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="text-lg font-semibold mx-auto">All Transactions</h3>
      </div>
      <div className="recent flex flex-col p-6 gap-6 overflow-scroll bg-white all-custom-height">
        {/* Show only 5 transactions */}
        <div className="hidden md:flex justify-between w-100 font-mono text-black/70">
          <div className="w-1/5">
            <h3 className=" capitalize">Transaction Title</h3>
          </div>
          <div className="w-2/5 text-end flex flex-col md:flex-row md:justify-between md:text-center">
            <h3 className="flex-1 ">Transaction Amount</h3>
            <p className="flex-1 mt-1 text-xs md:text-base md:mt-0 capitalize">
              Transaction Type
            </p>
          </div>
          <p className="w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base ">
            Transaction Time
          </p>
          <p className="w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base ">
            Actions
          </p>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            const {
              transactionTitle,
              transactionAmount,
              transactionTime,
              transactionType,
              id,
            } = transaction;

            const longTime = transactionTime.toDate();
            const shortTime =
              longTime.getDate() +
              " " +
              longTime.toLocaleString("en-us", { month: "short" }) +
              " " +
              longTime.getFullYear();

            return (
              <div key={id} className="flex justify-between w-100">
                <div className="w-1/3 md:w-1/5">
                  <h3 className="font-semibold capitalize">
                    {transactionTitle.toLowerCase()}
                  </h3>
                  <p className="mt-1 text-xs block md:hidden">{shortTime}</p>
                </div>
                <div className="w-1/3 md:w-2/5  flex flex-col md:flex-row text-end  md:text-center md:font-medium">
                  <h3 className="flex-1 font-semibold ">{`${
                    transactionType === "expense" ? "-" : "+"
                  } ₦${transactionAmount.toFixed(2)}`}</h3>
                  <p className="flex-1 mt-1 text-xs md:text-base md:mt-0 capitalize">
                    {transactionType}
                  </p>
                </div>
                <p className=" md:w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base ">
                  {longTime.toLocaleTimeString() + ", " + shortTime}
                </p>
                <div className="w-1/3 md:w-1/5 flex justify-end">
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="px-3 md:px-5 py-1 md:py-2 bg-[#f0f1f3] rounded-xl text-sm  md:text-base "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="font-thin">
            Your transactions will show here when you add them
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
