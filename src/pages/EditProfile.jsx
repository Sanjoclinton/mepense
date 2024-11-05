import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Form, Link, useNavigation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const currentUser = getAuth().currentUser;

  const actionType = formData.get("actionType");

  const name = formData.get("displayName");
  const number = formData.get("phoneNumber");
  const email = formData.get("email");


  try {
    if (name) {
      await updateProfile(currentUser, { displayName: name });
    }
    if (number) {
      await updateProfile(currentUser, { phoneNumber: number });
    }
    // if (email) {
    //   await updateEmail(currentUser, email);
    // }

    return "successful";
  } catch (err) {
  
    return "failed";
  }
};

const EditProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigation = useNavigation();
  const { user } = useAuthContext();

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
          <label
            htmlFor="displayName"
            className="flex flex-col gap-2 font-semibold"
          >
            Display Name
            <input
              name="displayName"
              id="displayName"
              type="text"
              placeholder={user.displayName}
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
              placeholder={user.phoneNumber || "08123456789"}
            />
          </label>
          <button
            type="submit"
            name="actionType"
            value="editProfile"
            className={`px-4 py-2 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
              navigation.state === "submitting"
                ? "bg-[#747272] text-white/70"
                : "bg-[#1c41f8] text-white"
            }`}
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "UPDATING" : "UPDATE "} PROFILE
          </button>
        </Form>
        <Form
          method="post"
          className="px-6 py-8 edit-profile flex flex-col gap-5 "
        >
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
            name="emailReset"
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
            value="changeMail"
            className={`px-4 py-2 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
              navigation.state === "submitting"
                ? "bg-[#747272] text-white/70"
                : "bg-[#1c41f8] text-white"
            }`}
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "CHANGING" : "CHANGE "} MAIL
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
