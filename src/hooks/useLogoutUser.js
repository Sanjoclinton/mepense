import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const useLogoutUser = () => {
  const logoutUser = async () => {
    try {
      await signOut(auth);
      navigate("/");
      return null;
    } catch (error) {
      return error.code;
    }
  };

  return {
    logoutUser,
  };
};
