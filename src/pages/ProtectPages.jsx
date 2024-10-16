import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { SlWallet } from "react-icons/sl";

const ProtectPages = () => {
  const { user, loading } = useAuthContext();

  return loading ? (
    <div className="min-h-screen flex items-center justify-center">
      {" "}
      <SlWallet size={50} className="m-auto" color="#1c41f8" />
    </div>
  ) : !user ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectPages;
