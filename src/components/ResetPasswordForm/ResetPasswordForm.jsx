import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { resetPassword } from "../../store/features/authentication/authenticationSlice";

const ResetPasswordForm = () => {
  // ----------USE STATES----------
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const { resetToken } = useParams();

  const resetPasswordData = {
    password,
    passwordConfirm,
  };

  const errorArray = authentication.error.split(". ");
  //   ----------HANDLERS---------
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ resetToken, resetPasswordData }))
      .then((response) => {
        return response.payload.status === "success"
          ? navigate("/agents")
          : null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <form className="bg-slate-50 p-5 rounded-lg" onSubmit={formSubmitHandler}>
        <p className="text-center text-black text-xl font-bold">
          Reset Password
        </p>
        <div className="my-2">
          <label className="text-black  font-medium">Password</label>
          <input
            type="text"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-primary w-full bg-white text-black"
          />
          {authentication.error ? (
            <p className="text-red-500 font-semibold">
              {errorArray.filter((error) => error.includes("8"))}
              {errorArray.filter((error) => error.includes("provide"))}
            </p>
          ) : null}
        </div>
        <div>
          <label className="text-black  font-medium">Password Confirm</label>
          <input
            type="text"
            placeholder="Confirm your Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="input input-bordered input-primary w-full bg-white text-black"
          />{" "}
          {authentication.error ? (
            <p className="text-red-500 font-semibold">
              {errorArray.filter((error) => error.includes("match"))}
              {errorArray.filter((error) => error.includes("confirm"))}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="mx-2 btn btn-success text-white"
            // onClick={submitFormHandler}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
