import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useGetUserSettings } from "../hooks/useGetUserSettings";
import { MdOutlineError } from "react-icons/md";

export const action = async ({ request }) => {
  const currentUser = getAuth().currentUser;

  const usersSettingsMainRef = doc(
    db,
    "users",
    currentUser.uid,
    "settings",
    "main"
  );

  const formData = await request.formData();

  const actionType = formData.get("actionType");
  const name = formData.get("displayName");
  const number = formData.get("phoneNumber");
  const email = formData.get("email");
  const password = formData.get("password");

  if ((actionType === "editProfile" && name) || number) {
    try {
      if (name) {
        await updateProfile(currentUser, { displayName: name.toLowerCase() });
      }
      if (number) {
        await updateDoc(usersSettingsMainRef, { phoneNumber: number });
      }
      return "Profile Updated Successfully!";
    } catch (err) {
      console.log(err.code);
      return "Check details and try again";
    }
  }
  if (actionType === "editMail") {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      await updateEmail(currentUser, email);
      return "Email Updated Successfully!";
    } catch (err) {
      let errorMessage = err.code;
      switch (errorMessage) {
        case "auth/invalid-credential":
          errorMessage = "Incorrect credentials, try again!";
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
  }
  return null;
};

const EditProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ClickedBtn, setClickedBtn] = useState("");
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { phoneNumber } = useGetUserSettings();

  const message = useActionData();

  return (
    <div className="layout-outlet-custom-height bg-white flex flex-col">
      <div className="p-6 flex items-center justify-between bg-white h-[88px]">
        <Link to=".." className="flex-1 ">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="flex-1 text-center font-semibold">Edit Profile</h3>
        <h2 className="flex-1 text-end font-bold text-lg">mepense</h2>
      </div>
      <div className="w-full max-w-[600px] mx-auto flex-1 overflow-y-auto no-scrollbar">
        <div className=" pt-4 flex flex-col items-center justify-center  gap-2">
          <img
            src={user.photoURL || "/profile.png"}
            alt="profile picture"
            className="h-16 w-16 rounded-full border border-slate-600"
          />
        </div>
        <Form
          method="post"
          className="px-6 py-8 edit-profile flex flex-col gap-5 "
        >
          {ClickedBtn && message && (
            <div
              className={`my-5 w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs 
            ${
              message !== "Profile Updated Successfully!"
                ? "bg-[#ffd7d7] text-[#ef4e4e]"
                : "bg-green-200 text-green-600"
            }`}
            >
              <MdOutlineError size={20} />
              <p> {message}</p>
            </div>
          )}
          <label
            htmlFor="displayName"
            className="flex flex-col gap-2 font-semibold"
          >
            Display Name
            <input
              type="text"
              pattern="^(\s?[a-zA-Z]{2,20}){1,4}$"
              name="displayName"
              id="displayName"
              placeholder={user.displayName}
              className="capitalize"
            />
          </label>
          <label
            htmlFor="phoneNumber"
            className="flex flex-col gap-2 font-semibold"
          >
            Phone Number
            <input
              name="phoneNumber"
              id="phoneNumber"
              type="number"
              placeholder={phoneNumber || ""}
              pattern="^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$"
            />
          </label>
          <button
            type="submit"
            name="actionType"
            value="editProfile"
            className={`px-4 py-2 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
              navigation.state === "submitting" && ClickedBtn
                ? "bg-[#747272] text-white/70"
                : "bg-[#1c41f8] text-white"
            }`}
            disabled={navigation.state === "submitting" && ClickedBtn}
            onClick={() => setClickedBtn(true)}
          >
            {navigation.state === "submitting" && ClickedBtn
              ? "UPDATING"
              : "UPDATE "}{" "}
            PROFILE
          </button>
        </Form>

        <Form
          method="post"
          className="px-6 py-8 edit-profile flex flex-col gap-5 "
        >
          {!ClickedBtn && message && (
            <div
              className={`my-5 w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs 
            ${
              message !== "Email Updated Successfully!"
                ? "bg-[#ffd7d7] text-[#ef4e4e]"
                : "bg-green-200 text-green-600"
            }`}
            >
              <MdOutlineError size={20} />
              <p> {message}</p>
            </div>
          )}
          <label htmlFor="email" className="flex flex-col gap-2 font-semibold">
            Change Email
            <input
              name="email"
              id="email"
              type="email"
              placeholder={user.email}
              required
            />
          </label>
          <div className="relative flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              required
              className="w-full"
            />
            <button
              type="button"
              className="absolute right-4"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {!passwordVisible ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          <button
            type="submit"
            name="actionType"
            value="editMail"
            className={`px-4 py-2 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
              navigation.state === "submitting" && !ClickedBtn
                ? "bg-[#747272] text-white/70"
                : "bg-[#1c41f8] text-white"
            }`}
            disabled={navigation.state === "submitting" && !ClickedBtn}
            onClick={() => setClickedBtn(false)}
          >
            {navigation.state === "submitting" && !ClickedBtn
              ? "CHANGING"
              : "CHANGE "}{" "}
            MAIL
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
