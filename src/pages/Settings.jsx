import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUserEdit } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlinePolicy,
  MdKeyboardArrowRight,
  MdOutlineError,
} from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { BsCurrencyExchange, BsEye, BsEyeSlash } from "react-icons/bs";
import { useAuthContext } from "../contexts/AuthContext";
import { useLogoutUser } from "../hooks/useLogoutUser";
import { IoClose } from "react-icons/io5";
import { useSetCurrency } from "../hooks/useSetCurrency";
import { useDeleteUserAccount } from "../hooks/useDeleteUserAccount";

export const Settings = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [showVerificationAlert, setshowVerificationAlert] = useState(false);

  const { deleteUserAccount } = useDeleteUserAccount();

  const { logoutUser } = useLogoutUser();
  const { user } = useAuthContext();

  const { handleOnchange, currency } = useSetCurrency();

  const toggleDeleteTop = () => {
    setShowDeletePopUp((prev) => !prev);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const deleteNow = await deleteUserAccount(password);
    setDeleteErrorMessage(deleteNow);
  };

  const handleEditProfileClick = () => {
    if (!user.emailVerified) {
      setshowVerificationAlert(true);

      setTimeout(() => {
        setshowVerificationAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="settings-custom-height bg-white relative">
      <div className="px-6 py-4 flex items-center justify-between bg-white h-[88px]">
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
        <div className="mt-3 sm:mt-8 pt-4 sm:pt-6 flex flex-col gap-2 sm:gap-4 *:py-2 sm:*:py-4 border-t sm:text-lg ">
          {/* Edit Profile */}
          {showVerificationAlert && (
            <div className="mb-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800">
              <p className="text-sm">
                Please verify your email address to edit your profile
              </p>
            </div>
          )}
          <div onClick={handleEditProfileClick}>
            <Link to={user.emailVerified ? "edit-profile" : "."}>
              <div className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600">
                <div className="flex items-center gap-5">
                  <FaUserEdit size={20} className="text-slate-500 " />
                  <p>Edit Profile</p>
                </div>
                <MdKeyboardArrowRight size={25} className="text-slate-500 " />
              </div>
            </Link>
          </div>

          {/* Edit Currency */}

          <div className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600">
            <div className="flex items-center gap-5">
              <BsCurrencyExchange size={20} className="text-slate-500 " />
              <p>Change Currency</p>
            </div>
            <select
              className="border px-3 py-1 rounded-lg font-bold"
              name="currency"
              id="currency"
              onChange={handleOnchange}
              value={currency}
            >
              <option value="₦">₦</option>
              <option value="$">$</option>
            </select>
          </div>

          {/* Terms and Conditions */}
          {/* <Link to="edit-profile"> */}
          <div className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600">
            <div className="flex items-center gap-5">
              <MdOutlinePolicy size={20} className="text-slate-500 " />
              <p>Terms of Service</p>
            </div>
            <MdKeyboardArrowRight size={25} className="text-slate-500 " />
          </div>
          {/* </Link> */}
          {/* Change Password */}
          <Link to="change-password">
            <div className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600">
              <div className="flex items-center gap-5">
                <CiEdit size={20} className="text-slate-500 " />
                <p>Change Password</p>
              </div>

              <MdKeyboardArrowRight size={25} className="text-slate-500 " />
            </div>
          </Link>
          {/* Logout */}
          <div
            onClick={logoutUser}
            className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600 cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <HiOutlineLogout size={20} className="text-slate-500 " />
              <p>Logout</p>
            </div>
          </div>
          {/* Delete Account */}
          <div
            onClick={toggleDeleteTop}
            className="flex items-center justify-between [&&>div>svg]:hover:text-blue-600 [&&>svg]:hover:text-blue-600 cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <MdDeleteForever size={20} className="text-slate-500 " />
              <p>Delete Account</p>
            </div>
          </div>
        </div>

        {/* Popups */}

        {/*1) Delete Popup */}
        {showDeletePopUp && (
          <div className="w-4/5 max-w-[500px]  flex flex-col gap-3 p-6 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/4 border rounded-xl bg-white shadow-xl shadow-black/20 delete z-10">
            <div>
              <IoClose
                onClick={toggleDeleteTop}
                className="ml-auto cursor-pointer"
              />
              {deleteErrorMessage && (
                <div className="my-5 rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs bg-[#ffd7d7] text-[#ef4e4e]">
                  <MdOutlineError size={20} />
                  <p> {deleteErrorMessage}</p>
                </div>
              )}
            </div>
            <p className="text- font-medium text-slate-500">
              Enter your password to confirm account delete
            </p>
            <form
              method="post"
              className="flex flex-col gap-5"
              onSubmit={handleDeleteUser}
            >
              <div className="relative flex flex-col justify-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  type="button"
                  className="absolute right-4"
                >
                  {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              <button
                type="submit"
                className="px-4 text-xs py-3 bg-[#1c41f8] rounded-lg shadow-slate-400 shadow-lg text-white font-semibold"
              >
                DELETE
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
