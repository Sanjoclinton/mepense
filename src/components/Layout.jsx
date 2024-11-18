import React, { useEffect, useState } from "react";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import RefreshServiceWorker from "./RefreshServiceWorker";
import { onMessage } from "firebase/messaging";
import { db, generateToken, messaging } from "../config/firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import NotificationToast from "./NotificationToast";

const Layout = () => {
  const [notification, setNotification] = useState(null);
  const { user } = useAuthContext();
  const userId = user.uid;
  const tokenDocRef = doc(db, "tokens", userId);

  // The save token page uses the getToken function to save to my db
  const saveToken = async () => {
    const token = await generateToken();
    await setDoc(tokenDocRef, {
      token: token,
    });
  };

  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  let permissionStatus;
  useEffect(() => {
    // Check if notification is on
    // If granted send the token to my data base.
    if (isSupported) {
      permissionStatus = Notification.permission;
      if (permissionStatus === "granted") {
        saveToken();
      }
    }

    // Foreground message
    onMessage(messaging, (payload) => {
      setNotification(payload.notification);
    });
  }, [permissionStatus]);

  return (
    <div className="bg-[#f0f1f3] flex flex-col h-dvh">
      <Outlet />
      {/* Lower nav */}
      <div className="p-6 flex justify-between items-center h-[96px] sm:mx-auto sm:w-[600px] ">
        <NavLink
          end
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? " text-slate-600 hover:text-slate-600 lower-nav"
              : "text-slate-400 hover:text-slate-600 lower-nav"
          }
        >
          <CiHome size={30} />
        </NavLink>
        <NavLink
          to="/dashboard/expenses"
          className={({ isActive }) =>
            isActive
              ? " text-slate-600 hover:text-slate-600 lower-nav"
              : "text-slate-400 hover:text-slate-600 lower-nav"
          }
        >
          <IoIosArrowRoundUp size={30} />
        </NavLink>

        <Link
          to="/add-transaction"
          className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
        >
          <IoAdd size={40} />
        </Link>
        <NavLink
          to="/dashboard/incomes"
          className={({ isActive }) =>
            isActive
              ? " text-slate-600 hover:text-slate-600 lower-nav"
              : "text-slate-400 hover:text-slate-600 lower-nav"
          }
        >
          <IoIosArrowRoundDown size={30} />
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive
              ? " text-slate-600 hover:text-slate-600 lower-nav"
              : "text-slate-400 hover:text-slate-600 lower-nav"
          }
        >
          <CiSettings size={30} />
        </NavLink>
      </div>
      <RefreshServiceWorker />
      {notification && <NotificationToast notification={notification} />}
    </div>
  );
};

export default Layout;
