import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export const useGetUserTransactions = (props = []) => {
  const [summary, setSummary] = useState([
    { id: 1, title: "Balance", amount: "" },
    { id: 2, title: "Income", amount: "" },
    { id: 3, title: "expense", amount: "" },
  ]);

  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const { user } = useAuthContext();
  const userId = user.uid;

  const userTransactionsCollectionRef = collection(
    db,
    "users",
    userId,
    "transactions"
  );
  const querySnapShot = query(
    userTransactionsCollectionRef,
    orderBy("transactionTime", "desc"),
    ...props
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(querySnapShot, (querySnapshot) => {
      let queryData = [];
      let expense = 0;
      let income = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        queryData.push({ ...data, id: doc.id });

        let amount = data.transactionAmount;
        if (data.transactionType === "expense") {
          expense += amount;
        } else {
          income += amount;
        }
      });

      const balance = income - expense;

      setSummary([
        { id: 1, title: "Balance", amount: balance },
        { id: 2, title: "Income", amount: income },
        { id: 3, title: "Expense", amount: expense },
      ]);

      setTransactions(queryData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { transactions, summary };
};
