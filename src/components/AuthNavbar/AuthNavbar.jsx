import { Link } from "react-router-dom";

import Logo from "../../utils/Images/Logo/logo.jpg";

const AuthNavbar = () => {
  return (
    <div className="sm:flex sm:justify-center pt-2 ">
      <div className="p-2 flex justify-between  sm:w-5/6">
        <Link to="/">
          <img src={Logo} className="w-20 sm:w-20 h-20 rounded-full " />
        </Link>
        <div className="flex items-center mb- ">
          <Link
            to="/authentication/login"
            className="  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 text-slate-50 text-bold underline text-lg sm:text-xl underline-offset-8 hover:text-yellow-400 mx-2 sm:mx-5 my-4"
          >
            Login
          </Link>
          <li className=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 lg:w-32 flex  items-center  mx-2 ">
            <Link
              to="/authentication/signup"
              className="lg:text-lg text-slate-50  border-2 border-slate-50 bg-transparent hover:bg-yellow-400 font-semibold btn sm:px-8 rounded-full"
            >
              Signup
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
