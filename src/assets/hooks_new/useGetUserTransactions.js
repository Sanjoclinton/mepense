import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

export const useGetUserTransactions = (props = []) => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuthContext();
  const userId = user.uid;

  const userTransactionsCollectionRef = collection(
    db,
    "users",
    userId,
    "transactions"
  );
  const querySnapShot = query(userTransactionsCollectionRef, ...props);

  useEffect(() => {
    const unsubscribe = onSnapshot(querySnapShot, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTransactions(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { transactions };
};
