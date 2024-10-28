import { addDoc, serverTimestamp } from "firebase/firestore";
import { transactionsCollectionRef } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

export const useAddTransactions = () => {
  const { user } = useAuthContext();

  const addTransactions = async () => {
    try {
      
      await addDoc(transactionsCollectionRef, {
        transactionTitle: "Food",
        transactionAmount: 2000,
        transactionType: "expense",
        transactionTime: serverTimestamp(),
        userID: user.uid,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return { addTransactions };
};
