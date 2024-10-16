import React from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { where } from "firebase/firestore";
import Transactions from "../../components/Transactions";

const IncomeTransactions = () => {
  const addConstraints = [where("transactionType", "==", "income")];

  const { transactions } = useGetTransactions(addConstraints);
  return (
    <>
      <Transactions transactions={transactions} title="All Incomes" />
    </>
  );
};

export default IncomeTransactions;
