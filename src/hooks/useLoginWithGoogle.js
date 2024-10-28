import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";
import {auth} from "../config/firebase";

export const useLoginWithGoogle = () => {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
     
    } catch (error) {
      console.log(error.code);
      return error.code;
    }
  };

  return {
    loginWithGoogle,
  };
};
