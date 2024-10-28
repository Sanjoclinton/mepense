import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Form, Link, useNavigation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const currentUser = getAuth().currentUser;

  const name = formData.get("displayName");
  const email = formData.get("email");
  const number = formData.get("displayName");

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
    console.log("lol")
    return "successful";
  } catch (err) {
    console.log(err.code);
    return "failed";
  }
};

const EditProfile = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();

  return (
    <div className="edit-profile-height bg-white">
      <div className="p-6 flex items-center justify-between bg-white h-[88px]">
        <Link to=".." className="flex-1 ">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="flex-1 text-center text-lg font-semibold">
          Edit Profile
        </h3>
        <h2 className="flex-1 text-end font-bold text-2xl">mepense</h2>
      </div>
      <div className="max-w-[600px] mx-auto">
        <div className=" pt-5 flex flex-col items-center justify-center  gap-3">
          <img
            src={user.photoURL || "/profile.png"}
            alt="profile picture"
            className="h-20 w-20 rounded-full border border-slate-600"
          />
        </div>
        <Form
          method="post"
          className="px-6 py-10 edit-profile flex flex-col gap-5 "
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
          <label htmlFor="email" className="flex flex-col gap-2 font-semibold">
            Email
            <input
              name="email"
              id="email"
              type="email"
              placeholder={user.email}
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
            className={`px-4 py-3 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
              navigation.state === "submitting"
                ? "bg-[#747272] text-white/70"
                : "bg-[#1c41f8] text-white"
            }`}
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "SAVING" : "SAVE "} CHANGES
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
