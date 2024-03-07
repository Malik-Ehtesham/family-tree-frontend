import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  auth,
  resetError,
} from "../../store/features/authentication/authenticationSlice";

const AuthenticationForm = () => {
  // ---------VARIABLE DECALARATIONS---------
  const { method } = useParams();

  //   -----------USE STATES------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSignUp, setIsSignUp] = useState(method === "signup" ? true : false);
  const [prevPath, setPrevPath] = useState("");

  // ------VARIABLES DECALARATIONS---------
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const authentication = useSelector((state) => state.authentication);

  const signUpData = {
    username,
    email,
    password,
    passwordConfirm,
  };
  const logInData = { email, password };

  const errorArray = authentication.error?.split(". ");

  // --------USE EFFECTS--------------

  useEffect(() => {
    setIsSignUp(method === "signup" ? true : false);
  }, [method]);

  // -------HANDLERS--------------

  const SubmitFormHandler = (e) => {
    e.preventDefault();
    // dispatch(auth({ isSignUp, signUpData, logInData }))
    //   .then((result) => {
    //     // Check for successful authentication
    //     if (result.payload && result.payload.token) {
    //       navigate("/");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Handle authentication failure if needed
    //   });
    dispatch(auth({ isSignUp, signUpData, logInData }))
      .then((result) => {
        // Check for successful authentication
        if (result.payload && result.payload.token) {
          // Get the previous path from the state (if it exists)
          // navigate(-1);
          navigate("/trees");
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle authentication failure if needed
      });
  };

  return (
    // <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700 border rounded-lg ">
    <div
      className={`bg-white w-full border-4 border-yellow-400 rounded-lg flex flex-col   py-6 px-4 xl:px-10 m-4 ${
        isSignUp ? `my-5` : `my-16 2xl:my-28`
      }`}
    >
      <p className="text-center font-bold text-3xl text-gray-600  pb-2">
        Signup
      </p>

      <form className="">
        {isSignUp ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full sm:py-7 sm:text-lg  rounded-full bg-transparent border-gray-600 hover:border-yellow-400 my-2"
            />{" "}
            {authentication.error ? (
              <p className="fs-6 m-0 text-red-500 font-semibold">
                {errorArray.filter((error) => error.includes("username"))}
              </p>
            ) : null}
          </>
        ) : null}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full sm:py-7 sm:text-lg  rounded-full bg-transparent  border-gray-600  hover:border-yellow-400 my-2"
        />
        {authentication.error ? (
          isSignUp ? (
            <p className="fs-6 m-0 text-red-500 font-semibold">
              {errorArray.filter((error) => error.includes("email"))}
            </p>
          ) : null
        ) : null}
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full sm:py-7 sm:text-lg   rounded-full bg-transparent  border-gray-600  hover:border-yellow-400 my-2"
        />
        {!isSignUp ? (
          <Link
            to="/forgotPassword"
            className="mx-2 text-emerald-600 cursor-pointer hover:underline"
            // onClick={() => {
            //   dispatch(resetError());
            // }}
          >
            Forgot your Password?
          </Link>
        ) : null}
        {authentication.error ? (
          isSignUp ? (
            <p className="fs-6 m-0 text-red-500 font-semibold">
              {errorArray.filter(
                (error) =>
                  error.includes("provide") && error.includes("password")
              )}
              {errorArray.filter((error) => error.includes("8"))}
            </p>
          ) : (
            <p className="fs-6 m-0 text-center text-red-500 font-semibold">
              {errorArray.filter(
                (error) => error.includes("email") || error.includes("Kindly")
              )}
            </p>
          )
        ) : null}
        {isSignUp ? (
          <>
            <input
              type="text"
              placeholder="Password Confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="input input-bordered w-full sm:py-7 sm:text-lg  rounded-full bg-transparent  border-gray-600  hover:border-yellow-400 my-2"
            />
            {authentication.error ? (
              <>
                <p className="fs-6 m-0 text-red-500 font-semibold">
                  {errorArray.filter((error) => error.includes("confirm"))}
                  {errorArray.filter((error) => error.includes("match"))}
                </p>
                <p className="fs-6 m-0 text-center text-red-500 font-semibold">
                  {errorArray.filter((error) =>
                    error.includes("Email/Password")
                  )}
                </p>
              </>
            ) : null}
          </>
        ) : null}

        {isSignUp ? (
          <div className=" flex justify-center items-center my-2">
            <div className="form-control mx-1">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-warning "
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 font-semibold">
              By creating an account, you agreeing to our Privacy Policy, and
              Electronics Communication Policy.
            </p>
          </div>
        ) : null}

        <button
          className="text-lg text-emerald-600 hover:bg-emerald-400  w-full btn-outline font-semibold btn rounded-full my-2"
          onClick={SubmitFormHandler}
          type="onSubmit"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-center mt-1 font-large">
          {isSignUp ? " Already have an account?" : "Don't have an account?"}
          <strong
            className="underline underline-offset-2 text-yellow-400 hover:text-emerald-400 cursor-pointer mx-1"
            onClick={() => {
              setIsSignUp(!isSignUp);
              dispatch(resetError());
              setUsername("");
              setEmail("");
              setPassword("");
              setPasswordConfirm("");
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </strong>
        </p>
      </form>
    </div>
    // </div>
  );
};

export default AuthenticationForm;
{
  /* <input
type="text"
placeholder="Password Confirm"
value={passwordConfirm}
onChange={(e) => setPasswordConfirm(e.target.value)}
className="input input-bordered w-full  sm:py-7 sm:text-lg  rounded-full bg-transparent border-gray-900 hover:border-yellow-400 my-2" */
}
