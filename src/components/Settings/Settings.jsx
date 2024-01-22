import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUser } from "../../store/features/users/usersSlice";

import Header from "../Header/Header";
import Spinner from "../Spinner/Spinner";
import AccountSettings from "../AccountSettings/AccountSettings";
import Footer from "../Footer/Footer";

const Settings = () => {
  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  //   ----USE FEECTS----------
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className=" min-h-screen ">
      <Header />
      {users.loading ? <Spinner /> : <AccountSettings />}
      <Footer />
    </div>
  );
};

export default Settings;
