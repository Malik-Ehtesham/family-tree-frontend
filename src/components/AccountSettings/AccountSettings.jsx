import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/features/authentication/authenticationSlice";
import ProfileImage from "../../utils/Images/Icons/profile2.jpg";

const AccountSettings = () => {
  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  return (
    <div className="flex justify-center my-5 mb-20 sm:my-10 m-2 sm:m-0">
      <form className=" w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3 bg-slate-200 p-5 rounded-lg">
        <div className="flex justify-center my-5">
          <img src={ProfileImage} className="w-40 border-2 rounded-lg" />
        </div>
        <div>
          <input
            type="text"
            placeholder={users.user?.username}
            readOnly
            className="input input-bordered input-primary w-full bg-white my-5  cursor-default"
          />
          <input
            type="text"
            placeholder={users.user?.email}
            readOnly
            className="input input-bordered input-primary w-full bg-white my-5  cursor-default"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-error text-white"
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
