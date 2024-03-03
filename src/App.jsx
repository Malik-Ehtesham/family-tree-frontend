import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthenticationPage from "./containers/AuthenticationPage/AuthenticationPage";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import PrivateRoutes from "./utils/Functions/PrivateRoutes";
import TreesPage from "./containers/TreesPage/TreesPage";
import FamilyTreePage from "./containers/FamilyTreePage/FamilyTreePage";
import SettingsPage from "./containers/SettingsPage/SettingsPage";
import ForgotPasswordPage from "./containers/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./containers/ResetPasswordPage/ResetPasswordPage";
import InviteCodePage from "./containers/InviteCodePage/InviteCodePage";
import DetailsPage from "./containers/DetailsPage/DetailsPage";

function App() {
  return (
    <div className=" min-h-screen" style={{ fontFamily: " sans-serif" }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/trees" element={<TreesPage />} />
          <Route path="/familytree/:id" element={<FamilyTreePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/details" element={<DetailsPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitecode" element={<InviteCodePage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />{" "}
        <Route
          path="/resetPassword/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/authentication/:method"
          element={<AuthenticationPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
