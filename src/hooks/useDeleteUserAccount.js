import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const useDeleteUserAccount = () => {
  const navigate = useNavigate();

  const deleteUserAccount = async (password) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);

      await deleteUser(user);
      navigate("/");
    } catch (err) {
      let errorMessage = err.code;
      switch (errorMessage) {
        case "auth/invalid-credential":
          errorMessage = "Incorrect password, try again!";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password must be stronger. Use a combination of letters, numbers, and special characters.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many unsuccessful attempts. Please wait a moment and try again.";
          break;
        default:
          errorMessage = "An error occured, try again later";
          break;
      }
     return errorMessage;
    }
  };

  return { deleteUserAccount };
};
