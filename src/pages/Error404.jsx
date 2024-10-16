import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center gap-5">
      <h1 className="text-9xl font-extrabold">Oops!</h1>
      <h5 className="mt-10 text-xl">404 - PAGE NOT FOUND</h5>

      <Link
        to="/dashboard"
        className="px-10 py-4 bg-[#1c41f8] rounded-lg shadow-slate-400 shadow-lg text-white font-semibold"
      >
        DASHBOARD
      </Link>
    </div>
  );
};
