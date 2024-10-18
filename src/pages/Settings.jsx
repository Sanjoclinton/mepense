import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { FaCheckCircle, FaUserEdit } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlinePolicy,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { BsCurrencyExchange } from "react-icons/bs";


const Settings = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="settings-custom-height bg-white">
      <div className="p-6 flex items-center justify-between bg-white h-[88px]">
        <Link to="/dashboard" className="flex-1 ">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="flex-1 text-center text-lg font-semibold">Settings</h3>
        <h2 className="flex-1 text-end font-bold text-2xl">mepense</h2>
      </div>
      <div className=" px-6">
        {/* Profile goes in here */}

        <div className="flex flex-col items-center justify-center sm:flex-row gap-3">
          <img
            src={user.photoURL || "/profile.png"}
            alt="profile picture"
            className="h-16 w-16  rounded-full border border-slate-600"
          />
          <div className="text-center sm:text-start">
            <h3 className="font-bold sm:text-lg">{user.displayName}</h3>

            {user.emailVerified ? (
              <div className="flex justify-center sm:justify-start items-center mt-2">
                <p className="opacity-70 text-sm">Verified</p>
                <FaCheckCircle size={12} className="ms-1 text-blue-600" />
              </div>
            ) : (
              <button className="hover:underline ">Verify Email</button>
            )}
          </div>
        </div>

        {/* Settings content */}
        <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 flex flex-col gap-2 sm:gap-4 *:py-3 sm:*:py-4 border-t sm:text-lg ">
          {/* Edit Profile */}
          <Link to="edit-profile">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <FaUserEdit size={20} className="text-slate-500" />
                <p>Edit Profile</p>
              </div>
              <MdKeyboardArrowRight size={25} className="text-slate-500" />
            </div>
          </Link>

          {/* Edit Currency */}
          <Link to="edit-profile">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <BsCurrencyExchange size={20} className="text-slate-500" />
                <p>Change Currency</p>
              </div>
              <MdKeyboardArrowRight size={25} className="text-slate-500" />
            </div>
          </Link>
          {/* Terms and Conditions */}
          <Link to="edit-profile">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <MdOutlinePolicy size={20} className="text-slate-500" />
                <p>Terms of Service</p>
              </div>
              <MdKeyboardArrowRight size={25} className="text-slate-500" />
            </div>
          </Link>
          {/* Change Password */}
          <Link to="edit-profile">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <CiEdit size={20} className="text-slate-500" />
                <p>Change Password</p>
              </div>
              <MdKeyboardArrowRight size={25} className="text-slate-500" />
            </div>
          </Link>
          {/* Logout */}
          <Link to="edit-profile">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <HiOutlineLogout size={20} className="text-slate-500" />
                <p>Logout</p>
              </div>
            </div>
          </Link>
          {/* Delete Account */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <MdDeleteForever size={20} className="text-slate-500" />
              <p>Delete Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
