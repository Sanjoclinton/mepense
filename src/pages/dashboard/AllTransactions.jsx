import React from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useSetCurrency } from "../../hooks/useSetCurrency";

const AllTransactions = () => {
  const { transactions } = useGetTransactions();
  const { currency } = useSetCurrency();

  const handleDeleteTransaction = async (id) => {
    const transactionDocRef = doc(db, "transactions", id);
    await deleteDoc(transactionDocRef);
  };

  return (
    <div>
      <header className="p-6 flex items-center bg-white shadow-md h-[88px]">
        <Link to="/dashboard">
          <button
            className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Go back to dashboard"
          >
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="text-lg font-semibold mx-auto text-gray-800">All Transactions</h3>
      </header>

      <main
        className="recent flex flex-col p-6 gap-6 overflow-scroll bg-white all-custom-height shadow-inner"
        aria-live="polite"
      >
        {/* Table Header */}
        <div className="hidden md:flex justify-between w-full font-mono text-black/70 border-b-2 pb-2">
          <div className="w-1/5">
            <h3 className="capitalize font-medium">Transaction Title</h3>
          </div>
          <div className="w-2/5 text-end flex flex-col md:flex-row md:justify-between md:text-center">
            <h3 className="flex-1 font-medium">Transaction Amount</h3>
            <p className="flex-1 mt-1 text-xs md:text-base md:mt-0 capitalize font-medium">
              Transaction Type
            </p>
          </div>
          <p className="w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base">
            Transaction Time
          </p>
          <p className="w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base">
            Actions
          </p>
        </div>

        {/* Transaction List */}
        {transactions.length > 0 ? (
          transactions.map(
            ({
              id,
              transactionTitle,
              transactionAmount,
              transactionTime,
              transactionType,
            }) => {
              const longTime = transactionTime.toDate();
              const shortTime = `${longTime.getDate()} ${longTime.toLocaleString(
                "en-us",
                { month: "short" }
              )} ${longTime.getFullYear()}`;

              return (
                <article key={id} className="flex justify-between w-full border-b py-4">
                  <div className="w-1/3 md:w-1/5">
                    <h3 className="font-semibold capitalize text-gray-800">
                      {transactionTitle.toLowerCase()}
                    </h3>
                    <p className="mt-1 text-xs block md:hidden">{shortTime}</p>
                  </div>
                  <div className="w-1/3 md:w-2/5 flex flex-col md:flex-row text-end md:text-center md:font-medium">
                    <h3 className={`flex-1 font-semibold ${transactionType === "expense" ? "text-red-600" : "text-green-600"}`}>
                      {`${transactionType === "expense" ? "-" : "+"} ${currency}${transactionAmount.toLocaleString("default", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                    </h3>
                    <p className="flex-1 mt-1 text-xs md:text-base md:mt-0 capitalize">
                      {transactionType}
                    </p>
                  </div>
                  <p className="md:w-1/5 text-xs hidden md:flex md:items-center md:justify-end md:text-base">
                    {`${longTime.toLocaleTimeString()}, ${shortTime}`}
                  </p>
                  <div className="w-1/3 md:w-1/5 flex justify-end items-start">
                    <button
                      onClick={() => handleDeleteTransaction(id)}
                      className="px-3 md:px-5 py-1 md:py-2 bg-red-500 text-white rounded-xl text-sm md:text-base hover:bg-red-600 transition-colors w-16 md:w-24"
                      aria-label={`Delete transaction ${transactionTitle}`}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            }
          )
        ) : (
          <p className="font-thin text-gray-500">
            Your transactions will show here when you add them.
          </p>
        )}
      </main>
    </div>
  );
};

export default AllTransactions;
