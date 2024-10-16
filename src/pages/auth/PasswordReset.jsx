import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { MdOutlineError } from "react-icons/md";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent, check your email");
    } catch (error) {
      setMessage("Invalid mail, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login px-6 py-6  min-h-screen sm:mx-auto sm:w-[600px]">
      <Link to="..">
        <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
          <IoChevronBackSharp size={22} />
        </button>
      </Link>
      <div className="mt-10">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <p className="opacity-65 mt-3">
          Enter your mail below to recieve a password reset link
        </p>
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
        <input
          type="email"
          name="emailReset"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 bg-[#1c41f8] rounded-lg shadow-slate-400 shadow-lg text-sm text-white font-semibold"
        >
          {loading ? "SENDING RESET LINK" : "RESET PASSWORD"}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
