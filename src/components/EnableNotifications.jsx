import React, { useEffect, useState } from "react";
import { db, generateToken } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { Bell } from "lucide-react";

const EnableNotifications = () => {
  const { user } = useAuthContext();
  const userId = user.uid;
  const [notisOn, setNotisOn] = useState(false);

  const tokenDocRef = doc(db, "tokens", userId);

  // The save token page uses the getToken function to save to my db
  const getAndSaveToken = async () => {
    const token = await generateToken();
    await setDoc(tokenDocRef, {
      token: token,
    });
  };

  //   Request Permission function
  const reqeustPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        getAndSaveToken();
        setNotisOn(true);
      }
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setNotisOn(true);
      } else {
        setNotisOn(false);
      }
    }
  }, []);

  return (
    <div
      onClick={reqeustPermission}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-5 [&&>svg]:hover:text-blue-600">
        <Bell size={20} />
        <button>Enable Notifications</button>
      </div>
      <div
        className={`${
          notisOn ? "bg-blue-600" : "bg-gray-500"
        } w-12 h-7 rounded-full flex items-center p-1`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transition-all duration-300 ease-in-out ${
            notisOn ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default EnableNotifications;
