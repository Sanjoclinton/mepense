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
import { db } from "../config/firebase";
import { useGetUserSettings } from "../hooks/useGetUserSettings";
import { MdOutlineError } from "react-icons/md";
import UploadWidget from "../components/UploadWidget";

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
    // Validate Name
    if (name) {
      const nameRegx = /^(\s?[a-zA-Z0-9]{2,10}){1,3}$/;
      if (!nameRegx.test(name)) {
        return {
          profileUpdate: {
            error:
              "Dsiplay Name must be 1-2 words, each 2-10 characters long, containing only letters and numbers",
          },
        };
      }
    }

    if (number) {
      // Validate amount is a valid number
      const numberRegx =
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
      if (!numberRegx.test(number)) {
        return {
          profileUpdate: { error: "Please provide a valid phone number" },
        };
      }
    }

    try {
      if (name) {
        await updateProfile(currentUser, { displayName: name.toLowerCase() });
      }
      if (number) {
        await updateDoc(usersSettingsMainRef, { phoneNumber: number });
      }
      return { profileUpdate: { success: "Profile Updated Successfully!" } };
    } catch (err) {
      return { profileUpdate: { error: "An error occured, please try again" } };
    }
  }
  if (actionType === "editMail") {
    const currentUser = getAuth().currentUser;
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    try {
      await reauthenticateWithCredential(currentUser, credential);
      await updateEmail(currentUser, email);
      return { emailUpdate: { success: "Email Updated Successfully!" } };
    } catch (err) {
      let errorMessage = err.code;
      console.log(errorMessage);
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
          errorMessage = "Failed to update email";
          break;
      }

      return { emailUpdate: { error: errorMessage } };
    }
  }
  return null;
};

const EditProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ClickedBtn, setClickedBtn] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { phoneNumber, imageUrl } = useGetUserSettings();

  const actionData = useActionData();

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
        <div className=" pt-4 flex flex-col items-center justify-center  gap-2 relative">
          <img
            src={imageUrl || "/profile.png"}
            alt="profile picture"
            className="h-16 w-16 rounded-full border border-slate-400"
          />
          <div className={`absolute ${imageUrl ? "hidden" : "flex"} items-center justify-center translate-x-8 translate-y-2 rounded-full bg-blue-600 h-6 w-6`}>
            <UploadWidget />
          </div>
        </div>
        <Form
          method="post"
          className="px-6 py-8 edit-profile flex flex-col gap-5 "
        >
          {actionData?.profileUpdate && (
            <div
              className={`my-5 w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs 
            ${
              actionData.profileUpdate?.error
                ? "bg-[#ffd7d7] text-[#ef4e4e]"
                : "bg-green-200 text-green-600"
            }`}
            >
              <MdOutlineError size={20} />
              <p>
                {" "}
                {actionData.profileUpdate?.error ||
                  actionData.profileUpdate?.success}
              </p>
            </div>
          )}
          <label
            htmlFor="displayName"
            className="flex flex-col gap-2 font-semibold"
          >
            Display Name
            <input
              type="text"
              pattern="^(\s?[a-zA-Z]{2,20}){1,3}$"
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
              type="text"
              placeholder={phoneNumber || "Enter Phone Number"}
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
          {actionData?.emailUpdate && (
            <div
              className={`my-5 w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs 
            ${
              actionData.emailUpdate?.error
                ? "bg-[#ffd7d7] text-[#ef4e4e]"
                : "bg-green-200 text-green-600"
            }`}
            >
              <MdOutlineError size={20} />
              <p>
                {" "}
                {actionData.emailUpdate?.error ||
                  actionData.emailUpdate?.success}
              </p>
            </div>
          )}
          <label htmlFor="email" className="flex flex-col gap-2 font-semibold">
            Change Email
            <input
              name="email"
              id="email"
              type="mail"
              placeholder={"Enter new mail"}
              required
            />
          </label>
          <div className="relative flex items-center">
            <input
              autoComplete="one-time-code"
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
