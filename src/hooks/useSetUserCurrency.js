import { useCallback, useEffect } from "react";
import { useGetUserSettings } from "./useGetUserSettings";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

export const useSetUserCurrency = () => {
  const { currency, loadingCurrency } = useGetUserSettings();
  const { user } = useAuthContext();
  const userId = user.uid;

  const setDefaultCurrency = async (prop) => {
    const userSettingsDocRef = doc(db, "users", userId, "settings", "main");

    try {
      await setDoc(
        userSettingsDocRef,
        {
          currency: prop,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleOnchange = useCallback((e) => {
    const newCurrency = e.target.value;
    setDefaultCurrency(newCurrency);
  }, []);

  useEffect(() => {
    if (!currency && !loadingCurrency) {
      setDefaultCurrency("₦");
    }
  }, [loadingCurrency]);

  return {
    currency,
    handleOnchange,
  };
};
