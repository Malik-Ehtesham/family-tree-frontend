import { Link } from "react-router-dom";

import Logo from "../../utils/Images/Logo/logo.jpg";

const DetailsPageNavbar = () => {
  return (
    <div className="flex justify-center bg-emerald-500">
      <div className="navbar sm:w-5/6">
        <div className="navbar-start lg:ms-10">
          <Link to="/">
            <img src={Logo} className="w-20 h-20 rounded-full" />
          </Link>
        </div>
        <div className="navbar-end lg:flex">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
          />
          <button className="btn btn-warning text-white mx-2">
            Enter Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageNavbar;
