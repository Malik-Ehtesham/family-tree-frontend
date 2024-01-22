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

function App() {
  return (
    <div className=" min-h-screen" style={{ fontFamily: " sans-serif" }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/trees" element={<TreesPage />} />
          <Route path="/familytree/:id" element={<FamilyTreePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />

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
