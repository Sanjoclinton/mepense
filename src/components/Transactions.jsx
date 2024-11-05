import React from "react";
import { Link } from "react-router-dom";
import { useSetCurrency } from "../hooks/useSetCurrency";

const Transactions = ({ transactions, title }) => {
  const { currency } = useSetCurrency();

  return (
    <section className="flex flex-col h-full">
      {/* Header for Transactions */}
      <header className="px-6 pt-6 flex justify-between items-center h-[81.6px] font-mono bg-white">
        <h3 className="font-semibold">{title}</h3>
        <Link
          to="/transactions"
          className="border rounded-md py-1 px-2 hover:bg-slate-100/50"
        >
          View all
        </Link>
      </header>

      {/* Transactions List */}
      <div
        className={`recent flex-1 flex flex-col p-6 gap-6 overflow-scroll bg-white`}
        aria-live="polite"
      >
        {/* Show only 5 transactions */}
        <div className="hidden md:flex justify-between w-full font-mono text-black/70">
          <div className="w-1/4">
            <h3 className="capitalize">Transaction Title</h3>
          </div>
          <div className="w-1/2 text-end flex flex-col md:flex-row md:justify-between md:text-center">
            <h3 className="flex-1">Transaction Amount</h3>
            <p className="flex-1 mt-1 text-xs md:text-base md:mt-0 capitalize">
              Transaction Type
            </p>
          </div>
          <p className="w-1/4 text-xs hidden md:flex md:items-center md:justify-end md:text-base">
            Transaction Time
          </p>
        </div>

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
                <article key={id} className="flex justify-between w-full">
                  <div className="w-1/4">
                    <h3 className="font-semibold capitalize">
                      {transactionTitle.toLowerCase()}
                    </h3>
                    <p className="mt-1 text-xs block md:hidden">{shortTime}</p>
                  </div>
                  <div className="w-1/2 text-end flex flex-col md:flex-row md:justify-between md:text-center">
                    <h3
                      className={`flex-1 font-semibold ${
                        transactionType === "expense" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {`${
                        transactionType === "expense" ? "-" : "+"
                      } ${currency}${transactionAmount.toLocaleString("default", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                    </h3>
                    <p className="flex-1 mt-1 text-xs md:text-base md:font-medium md:mt-0 capitalize">
                      {transactionType}
                    </p>
                  </div>
                  <p className="w-1/4 text-xs hidden md:flex md:items-center md:justify-end md:text-base">
                    {longTime.toLocaleTimeString()}, {shortTime}
                  </p>
                </article>
              );
            }
          )
        ) : (
          <p className="font-thin">
            Your transactions will show here when you add them.
          </p>
        )}
      </div>
    </section>
  );
};

export default Transactions;
