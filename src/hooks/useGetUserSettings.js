import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { onSnapshot, doc, setDoc } from "firebase/firestore";

export const useGetUserSettings = () => {
  const [currency, setCurrency] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const [imageUrl, setImageUrl] = useState();
  const { user } = useAuthContext();
  const userId = user.uid;

  const userSettingsDocRef = doc(db, "users", userId, "settings", "main");

  const setDefaultCurrency = async (prop) => {
    try {
      await setDoc(
        userSettingsDocRef,
        {
          currency: prop,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Not setting working")
      console.log(error);
    }
  };

  const handleOnchange = useCallback((e) => {
    const newCurrency = e.target.value;
    setDefaultCurrency(newCurrency);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(userSettingsDocRef, (doc) => {
      if (doc.data()?.currency) {
        setCurrency(doc.data()?.currency);
      } else {
        setDefaultCurrency("₦");
        setCurrency("₦");
      }
      setPhoneNumber(doc.data()?.phoneNumber);
      setImageUrl(doc.data()?.imageUrl);
      setLoadingCurrency(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { currency, loadingCurrency, phoneNumber, imageUrl, handleOnchange };
};
