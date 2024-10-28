import { useCallback, useEffect, useState } from "react";

export const useSetCurrency = () => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "₦"
  );

  useEffect(() => {
    let selectedCurrency = localStorage.getItem("currency");
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    } else {
      localStorage.setItem("currency", "₦");
    }
  }, []);

 const handleOnchange =  useCallback((e) => {
    const newCurrency = e.target.value;
    localStorage.setItem("currency", newCurrency);
    setCurrency(newCurrency);
  }, []);

  return { handleOnchange, currency };
};
