import React from "react";

import { limit } from "firebase/firestore";
import Transactions from "../../components/Transactions";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";

const RecentTransactions = () => {
  const addConstraints = [limit(5)];

  const { transactions } = useGetUserTransactions(addConstraints);
  return (
    <>
      <Transactions transactions={transactions} title="Recent Transactions" />
    </>
  );
};

export default RecentTransactions;
