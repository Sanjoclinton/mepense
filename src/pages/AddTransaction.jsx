import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import { transactionsCollectionRef } from "../config/firebase";
import { MdOutlineError } from "react-icons/md";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    await addDoc(transactionsCollectionRef, {
      transactionTitle: formData.get("transactionTitle"),
      transactionAmount: Number(formData.get("transactionAmount")),
      transactionType: formData.get("transactionType"),
      transactionTime: serverTimestamp(),
      userID: formData.get("userID"),
    });
    return "Transaction has been added";
  } catch (error) {
    console.log(error.code);
    return error.code;
  }
};

const AddTransaction = () => {
  const { user } = useAuthContext();
  const message = useActionData();
  const navigation = useNavigation();
  const formRef = useRef(null);

  useEffect(() => {
    if (message === "Transaction has been added") {
      formRef?.current.reset();
    }
  }, [message]);

  return (
    <div className=" flex flex-col bg-white add-custom-height ">
      <div className="p-6 flex items-center bg-white h-[88px]">
        <Link to="/dashboard">
          <button className="w-8 h-8 border-slate-400 border rounded-full flex items-center justify-center">
            <IoChevronBackSharp size={22} />
          </button>
        </Link>
        <h3 className="text-lg font-semibold mx-auto">Add Transaction</h3>
        <h2 className="font-bold text-2xl">mepense</h2>
      </div>

      <Form
        ref={formRef}
        method="post"
        className="add flex flex-col gap-8 px-6 py-10 text-black/75 sm:w-[600px] sm:mx-auto"
      >
        {message && (
          <div className=" w-full rounded-lg gap-1 py-3 px-4 flex items-center justify-center text-xs bg-green-200 text-green-600">
            <MdOutlineError size={20} />
            <p> {message}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="transactionTitle">Transaction Title</label>
          <input
            type="text"
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
            <p className="absolute right-3 font-bold opacity-55">$</p>
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
