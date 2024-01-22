import { Link } from "react-router-dom";

// import "./Navbar.css";

import Logo from "../../utils/Images/Logo/logo.jpg";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="flex justify-center bg-emerald-500">
      <div className="navbar sm:w-5/6">
        <div className="navbar-start lg:ms-10">
          <Link to="/">
            <img src={Logo} className="w-20 h-20 rounded-full" />
          </Link>
        </div>
        <div className="navbar-end lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center">
            <li className=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 lg:w-24 flex  items-center mx-1 ">
              <Link
                to="/"
                className="text-lg text-white hover:text-yellow-400 font-semibold aai-gradient-outline-btn p-4 rounded-full"
              >
                Home
              </Link>
            </li>

            <li
              id="navbar"
              className=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 lg:w-32 flex  items-center  mx-1"
            >
              <Link
                to="/trees"
                className="text-lg text-white hover:text-yellow-400 font-semibold aai-gradient-outline-btn p-4 rounded-full "
              >
                {" "}
                Trees
              </Link>
            </li>
            {token ? (
              <li
                id="navbar"
                className=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 lg:w-32 flex  items-center  mx-1"
              >
                <Link
                  to="/settings"
                  className="text-lg text-white hover:text-yellow-400 font-semibold aai-gradient-outline-btn p-4 rounded-full "
                >
                  {" "}
                  Settings
                </Link>
              </li>
            ) : (
              <li
                id="navbar"
                className=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 lg:w-32 flex  items-center  mx-1"
              >
                <Link
                  to="/settings"
                  className="text-lg text-white hover:text-yellow-400 font-semibold aai-gradient-outline-btn p-4 rounded-full "
                >
                  {" "}
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
