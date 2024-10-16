import { useEffect, useState } from "react";

import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";

import { SlWallet } from "react-icons/sl";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useAuthContext } from "../../contexts/AuthContext";

// Form action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  try {
    const currentUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(currentUser.user, {
      displayName: firstName + " " + lastName,
    });
    return redirect("/dashboard");
  } catch (error) {
    let errorMessage = error.code;

    switch (errorMessage) {
      case "auth/weak-password":
        errorMessage =
          "Password must be stronger. Use a combination of letters, numbers, and special characters.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "An account with this email already exists.";
        break;
      case "auth/invalid-email":
        errorMessage =
          "The email address you entered is not valid. Please check and try again.";
        break;
      case "auth/too-many-requests":
        errorMessage =
          "Too many unsuccessful attempts. Please wait a moment and try again.";
        break;

      default:
        errorMessage = "Something went wrong. Please try again.";
        break;
    }
    console.log(error.code);
    return errorMessage;
  }
};

// LOGIN COMPONENT
const signupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const message = useActionData();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return navigate("/dashboard");
    } catch (error) {
      return error.code;
    }
  };

  return (
    <div className="login px-6 py-16  min-h-screen sm:mx-auto sm:w-[600px]">
      {/* BrandName and logo */}
      <div className=" w-full">
        <div className="text-center mb-10">
          <SlWallet size={50} className="m-auto" color="#1c41f8" />
          <h2 className="mt-3 font-bold text-2xl">mepense</h2>
        </div>

        {/* Shows the login error from firebase */}
        {message && (
          <div className="mb-5 rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs bg-[#ffd7d7] text-[#ef4e4e]">
            <MdOutlineError size={20} />
            <p> {message}</p>
          </div>
        )}

        {/* My login form */}
        <Form method="post" replace className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required
          />
          <input type="text" placeholder="Last Name" name="lastName" required />
          <input type="email" placeholder="Email" name="email" required />
          <div className="relative flex flex-col justify-center">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
            />
            <button
              type="button"
              className="absolute right-4"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-[#1c41f8] rounded-lg shadow-slate-400 shadow-lg text-sm text-white font-semibold"
          >
            SIGN UP
          </button>
        </Form>

        {/* Other login methods */}
        <div className="mt-10 text-center flex flex-col gap-5">
          <p>Or</p>
          <button
            className="font-medium flex items-center justify-center border gap-5 rounded-lg p-4 w-full "
            onClick={handleSignInWithGoogle}
          >
            <FcGoogle size={24} />
            CONTINUE WITH GOOGLE
          </button>

          <p>
            Already have an account?{" "}
            <Link to=".." className="text-sm text-blue-700">
              Login here
            </Link>
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default signupPage;
