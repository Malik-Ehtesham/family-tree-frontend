import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  forgotPassword,
  resetError,
} from "../../store/features/authentication/authenticationSlice";

const ForgotPasswordForm = () => {
  // -----------USE STATE------------
  const [email, setEmail] = useState("");

  // ------------VARIABLE DECALARTIONS-----------------
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);

  //   ------HANDLERS---------
  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email, toast }));
  };

  return (
    <div className="">
      <form className="bg-slate-300 p-5 rounded-lg w-80 sm:w-96 ">
        <p className="text-center text-black text-xl font-bold ">
          Forgot Password
        </p>
        <div>
          <label className="text-black  font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-primary w-full bg-white text-black"
          />
          {authentication.error?.toLowerCase().includes("email") ? (
            <p className=" text-red-500 font-semibold text-sm">
              {authentication.error}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="mx-2 btn btn-error text-white"
            type="button"
            onClick={() => {
              navigate("/authentication/signup");
              dispatch(resetError());
            }}
          >
            Cancel
          </button>{" "}
          <button
            className="mx-2 btn btn-success text-white"
            type="onSubmit"
            onClick={submitFormHandler}
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
