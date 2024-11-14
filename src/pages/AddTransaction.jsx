import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoChevronBackSharp } from "react-icons/io5";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import { db, auth } from "../config/firebase";
import { MdOutlineError } from "react-icons/md";
import { useRef } from "react";
import { useGetUserSettings } from "../hooks/useGetUserSettings";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userId = auth.currentUser.uid;

  const usersTransactionCollectionRef = collection(
    db,
    "users",
    userId,
    "transactions"
  );

  const title = formData.get("transactionTitle")?.trim();
  const amount = formData.get("transactionAmount");
  const type = formData.get("transactionType");
  const userID = formData.get("userID");

  if (!title || !amount || !type || !userID) {
    return { error: "All fields are required" };
  }

  const titleRegex = /^(\s?[a-zA-Z0-9]{2,10}){1,4}$/;
  if (!titleRegex.test(title)) {
    return {
      error:
        "Title must be 1-4 words, each 2-10 characters long, containing only letters and numbers",
    };
  }

  // Validate amount is a valid number
  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return { error: "Amount must be a valid positive number" };
  }

  const validTypes = ["income", "expense"];
  if (!validTypes.includes(type)) {
    return { error: "Invalid transaction type" };
  }

  try {
    await addDoc(usersTransactionCollectionRef, {
      transactionTitle: title,
      transactionAmount: numAmount,
      transactionType: type,
      transactionTime: serverTimestamp(),
      userID: userID,
    });

    return { success: "Transaction has been added successfully" };
  } catch (error) {
    return {
      error: "Failed to add transaction. Please try again later.",
    };
  }
};

const AddTransaction = () => {
  const formRef = useRef(null);
  const { user } = useAuthContext();
  const message = useActionData();
  const navigation = useNavigation();

  const { currency } = useGetUserSettings();

  if (message) {
    formRef.current.reset();
  }

  return (
    <div className=" flex flex-col bg-white layout-outlet-custom-height ">
      <div className="p-6 flex items-center bg-white h-[88px]">
        <Link to="/dashboard">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className=" font-semibold mx-auto">Add Transaction</h3>
        <h2 className="font-bold text-lg">mepense</h2>
      </div>

      <Form
        ref={formRef}
        method="post"
        className="add flex-1 overflow-y-auto no-scrollbar flex flex-col gap-8 px-6 py-10 text-black/75 sm:w-[600px] sm:mx-auto"
      >
        {message && (
          <div
            className={`w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs ${
              message.success
                ? "bg-green-200 text-green-600"
                : message.error
                ? "bg-red-200 text-red-600"
                : ""
            }`}
          >
            <MdOutlineError size={20} />
            <p> {message.success || message.error}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="transactionTitle">Transaction Title</label>
          <input
            type="text"
            pattern="^(\s?[a-zA-Z0-9]{2,10}){1,4}$"
            name="transactionTitle"
            id="transactionTitle"
            placeholder="e.g Food, transportation"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="transactionAmount">Transaction Amount</label>
          <div className="flex items-center relative">
            <input
              type="text"
              pattern="^\d*(\.\d{0,2})?$"
              step="any"
              name="transactionAmount"
              id="transactionAmount"
              placeholder="100.00"
              className="w-full"
              required
            />
            <p className="absolute right-3 font-bold opacity-55">{currency}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label>Transaction Type</label>

          <div className="flex gap-4 text-sm font-semibold text-black">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="transactionType"
                id="expense"
                value="expense"
                required
              />
              <label htmlFor="expense">Expense</label>
            </div>

            <div className="flex gap-1 items-center">
              {" "}
              <input
                type="radio"
                name="transactionType"
                id="income"
                value="income"
                required
              />
              <label htmlFor="income">Income</label>
            </div>
          </div>
        </div>
        <input
          className="hidden"
          readOnly
          type="text"
          name="userID"
          value={user.uid}
        />
        <button
          type="submit"
          className={`px-4 py-3 mt-5 rounded-lg shadow-slate-400 shadow-lg text-sm  font-semibold ${
            navigation.state === "submitting"
              ? "bg-[#747272] text-white/70"
              : "bg-[#1c41f8] text-white"
          }`}
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "ADDING" : "ADD "} TRANSACTION
        </button>
      </Form>
    </div>
  );
};

export default AddTransaction;
