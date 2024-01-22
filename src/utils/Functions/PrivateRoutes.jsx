import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // ------VARIABLES DECALARATIONS---------
  const token = localStorage.getItem("token");

  return token && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/authentication/signup" />
  );
};

export default PrivateRoutes;
