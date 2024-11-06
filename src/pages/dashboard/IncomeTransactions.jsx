import React from "react";
import { where } from "firebase/firestore";
import Transactions from "../../components/Transactions";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";

const IncomeTransactions = () => {
  const addConstraints = [where("transactionType", "==", "income")];

  const { transactions } = useGetUserTransactions(addConstraints);
  return (
    <>
      <Transactions transactions={transactions} title="All Incomes" />
    </>
  );
};

export default IncomeTransactions;
