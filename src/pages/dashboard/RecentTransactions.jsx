import React from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { limit } from "firebase/firestore";
import Transactions from "../../components/Transactions";

const RecentTransactions = () => {
  const addConstraints = [limit(5)];

  const { transactions } = useGetTransactions(addConstraints);
  return (
    <>
      <Transactions transactions={transactions} title="Recent Transactions" />
    </>
  );
};

export default RecentTransactions;
