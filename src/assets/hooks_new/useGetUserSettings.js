import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { onSnapshot, doc } from "firebase/firestore";

export const useGetUserSettings = () => {
  const [currency, setCurrency] = useState("");
  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const { user } = useAuthContext();
  const userId = user.uid;

  const userSettingsDocRef = doc(db, "users", userId, "settings", "main");

  useEffect(() => {
    const unsubscribe = onSnapshot(userSettingsDocRef, (doc) => {
      setCurrency(doc.data().currency);
      localStorage.setItem("currency", doc.data().currency);
      setLoadingCurrency(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { currency, loadingCurrency };
};
