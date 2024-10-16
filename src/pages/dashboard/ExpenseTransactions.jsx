import React from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { where } from "firebase/firestore";
import Transactions from "../../components/Transactions";

const ExpenseTransactions = () => {
  const addConstraints = [where("transactionType", "==", "expense")];
  const { transactions } = useGetTransactions(addConstraints);

  return (
    <>
      <Transactions transactions={transactions} title="All Expenses" />
    </>
  );
};

export default ExpenseTransactions;
