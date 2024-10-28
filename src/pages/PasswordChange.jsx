import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { MdOutlineError } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState("false");
  const [newPasswordVisible, setNewPasswordVisible] = useState("false");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      console.log("reauthenticated");
      await updatePassword(user, newPassword);
      console.log("password updated");
      setMessage("Password Succesfully Changed.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      let errorMessage = err.code;
      console.log(errorMessage);
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
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login px-6 py-6  h-dvh sm:mx-auto sm:w-[600px]">
      <Link to="..">
        <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
          <IoChevronBackSharp size={22} />
        </button>
      </Link>
      <div className="mt-10">
        <h1 className="text-3xl font-semibold">Update Password</h1>
      </div>
      {/* Shows the successful message that password has been sent  */}
      {message && (
        // Check if it's an error or success message
        <div
          className={`my-5 w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs 
            ${
              message === "Invalid mail, please try again"
                ? "bg-[#ffd7d7] text-[#ef4e4e]"
                : "bg-green-200 text-green-600"
            }`}
        >
          <MdOutlineError size={20} />
          <p> {message}</p>
        </div>
      )}
      <form
        className="reset mt-5 flex flex-col gap-5"
        action="post"
        onSubmit={handleSubmit}
      >
        <div className="relative flex items-center">
          <input
            type={oldPasswordVisible ? "text" : "password"}
            name="emailReset"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full"
          />
          <button
            type="button"
            className="absolute right-4"
            onClick={() => setOldPasswordVisible((prev) => !prev)}
          >
            {oldPasswordVisible ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        <div className="flex items-center relative">
          <input
            type={newPasswordVisible ? "text" : "password"}
            name="emailReset"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full"
          />
          <button
            type="button"
            className="absolute right-4"
            onClick={() => setNewPasswordVisible((prev) => !prev)}
          >
            {newPasswordVisible ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 bg-[#1c41f8] rounded-lg shadow-slate-400 shadow-lg text-sm text-white font-semibold"
        >
          {loading ? "UPDATING PASSWORD" : "RESET PASSWORD"}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
