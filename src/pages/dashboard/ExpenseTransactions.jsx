import React from "react";
import { where } from "firebase/firestore";
import Transactions from "../../components/Transactions";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";

const ExpenseTransactions = () => {
  const addConstraints = [where("transactionType", "==", "expense")];
  const { transactions } = useGetUserTransactions(addConstraints);

  return (
    <>
      <Transactions transactions={transactions} title="All Expenses" />
    </>
  );
};

export default ExpenseTransactions;
