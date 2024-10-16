import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { transactionsCollectionRef } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

export const useGetTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([
    { id: 1, title: "Balance", amount: 0 },
    { id: 2, title: "Income", amount: 0 },
    { id: 3, title: "expense", amount: 0 },
  ]);
  const { user } = useAuthContext();

  const queryConstraints = [
    where("userID", "==", user.uid),
    orderBy("transactionTime", "desc"),
  ];

  if (props) {
    props.forEach((prop) => queryConstraints.push(prop));
  }

  useEffect(() => {
    const queryTransactions = query(
      transactionsCollectionRef,
      ...queryConstraints
    );

    let unsubscribe = onSnapshot(queryTransactions, (querySnapShot) => {
      let queryData = [];
      let expense = 0;
      let income = 0;

      querySnapShot.forEach((doc) => {
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
  }, [user]);

  return { transactions, summary };
};
