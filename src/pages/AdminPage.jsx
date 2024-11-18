import React from "react";

import { useAuthContext } from "../contexts/AuthContext";
import { SlWallet } from "react-icons/sl";
import { Navigate, Outlet } from "react-router-dom";

const AdminPage = () => {
  const { user, loading } = useAuthContext();

  
  return loading ? (
    <div className="min-h-screen flex items-center justify-center">
      {" "}
      <SlWallet size={50} className="m-auto" color="#1c41f8" />
    </div>
  ) : user.uid !== "wxYipbwy22V9eHaqgtxNELUmUQA2" ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
};

export default AdminPage;
