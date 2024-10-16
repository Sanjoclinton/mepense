import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings-custom-height bg-white">
      <div className="p-6 flex items-center bg-white h-[88px]">
        <Link to="/dashboard">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="text-lg font-semibold mx-auto">Settings</h3>
        <h2 className="font-bold text-2xl">mepense</h2>
      </div>
      <div className="py-10 px-6">
        (Edit Name Edit Profile Picture Delete Account Logout Edit Password) GOES IN here
      </div>
    </div>
  );
};

export default Settings;
