import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import LoginPage, { action as signinAction } from "./pages/auth/LoginPage";
import SignupPage, { action as signupAction } from "./pages/auth/SignupPage";
import ProtectPages from "./pages/ProtectPages";

import PasswordReset from "./pages/auth/PasswordReset";
import AddTransaction, {
  action as addTransactionAction,
} from "./pages/AddTransaction";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import Layout from "./components/Layout";
import RecentTransactions from "./pages/dashboard/RecentTransactions";
import ExpenseTransactions from "./pages/dashboard/ExpenseTransactions";
import IncomeTransactions from "./pages/dashboard/IncomeTransactions";

import AllTransactions from "./pages/dashboard/AllTransactions";
import { Error404 } from "./pages/Error404";
import PasswordChange from "./pages/PasswordChange";
import EditProfile, { action as editAction } from "./pages/EditProfile";
import { AuthProvider } from "./contexts/AuthContext";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import AdminIndexPage from "./pages/AdminIndexPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/">
          {/* <Route element={<MaxWidthLayout />}> */}
          <Route path="/" element={<LoginPage />} action={signinAction} />
          <Route path="signup" element={<SignupPage />} action={signupAction} />
          <Route path="reset-password" element={<PasswordReset />} />

          <Route element={<AdminPage />}>
            <Route path="admin" element={<AdminIndexPage />} />
          </Route>
          <Route element={<ProtectPages />}>
            <Route element={<Layout />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<RecentTransactions />} />
                <Route path="expenses" element={<ExpenseTransactions />} />
                <Route path="incomes" element={<IncomeTransactions />} />
              </Route>
              <Route path="transactions" element={<AllTransactions />} />
              <Route
                path="add-transaction"
                element={<AddTransaction />}
                action={addTransactionAction}
              />
              <Route path="settings">
                <Route index element={<Settings />} />
                <Route path="change-password" element={<PasswordChange />} />
                <Route
                  path="edit-profile"
                  element={<EditProfile />}
                  action={editAction}
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Route>
        {/* </Route> */}
      </>
    )
  );
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
