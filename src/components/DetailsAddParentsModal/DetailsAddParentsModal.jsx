/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import ProfileImage from "../../utils/Images/Icons/profile2.jpg";
import FemaleProfileImage from "../../utils/Images/Icons/profile-female.jpg";

import "react-datetime/css/react-datetime.css";

import "react-datepicker/dist/react-datepicker.css";
import {
  updateMembers,
  fetchMembers,
  fetchSingleMember,
  createSpouse,
  createParents,
} from "../../store/features/members/membersSlice";
import { useNavigate, useParams } from "react-router-dom";
import DetailsAddParentCard from "../DetailsAddParentCard/DetailsAddParentCard";
import { useForm } from "react-hook-form";

const DetailsAddParentsModal = (props) => {
  //   ------------USE STATES---------------
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [gender, setGender] = useState("");
  const [motherDob, setMotherDob] = useState("");
  const [motherDod, setMotherDod] = useState("");
  const [fatherDob, setFatherDob] = useState("");
  const [fatherDod, setFatherDod] = useState("");
  const [fatherImg, setFatherImg] = useState(ProfileImage);
  const [fatherPreviewImg, setFatherPreviewImg] = useState(ProfileImage);
  const [motherImg, setMotherImg] = useState(FemaleProfileImage);
  const [motherPreviewImg, setMotherPreviewImg] = useState(FemaleProfileImage);
  const [fatherError, setFatherError] = useState(false);
  const [motherError, setMotherError] = useState(false);

  //   ------------VAIRABLE DECLARATIONS---------------
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const data = new FormData();
  // data.append("name", name);
  // data.append("gender", gender);
  // data.append("img", img);
  // data.append("dob", dob);
  // data.append("dod", dod);

  // console.log(data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   ---------HANDLERS----------

  const handleMotherFileChange = (e) => {
    const file = e.target.files[0];
    setMotherImg(file);
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setMotherPreviewImg(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFatherFileChange = (e) => {
    const file = e.target.files[0];
    setFatherImg(file);
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setFatherPreviewImg(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const formSubmitHandler = () => {
    // e.preventDefault();

    if (!fatherName) {
      setFatherError(true);
    } else if (!motherName) {
      setMotherError(true);
    } else {
      const id = localStorage.getItem("inviteCode");
      dispatch(fetchSingleMember(id))
        .then((result) => {
          console.log(result);

          const parentsData = {
            motherName,
            fatherName,
            childId: result.payload.id,
            familyTreeId: result.payload.familyTreeId,
          };

          const familyTreeId = result.payload.familyTreeId;
          dispatch(createParents({ parentsData, dispatch, fetchMembers }))
            .then((result) => {
              console.log(result);
              props.setCurrentDetails("Parents Details");
              navigate(`/familyTree/${familyTreeId}`);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
  };

  const cancelFormSubmitHandler = () => {
    const id = localStorage.getItem("inviteCode");
    dispatch(fetchSingleMember(id))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate(`/familyTree/${result.payload.familyTreeId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex justify-center my-5 p-5 sm:p-0">
        <div className="">
          <form
            className="grid grid-cols-1 sm:grid-cols-2  p-0 
     border-4 border-emerald-400 rounded-lg   "
          >
            <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-lg p-4">
              {fatherImg ? (
                <img
                  className="rounded-full w-36 h-36 sm:w-44 sm:h-44 border-4"
                  src={fatherPreviewImg}
                  alt="Member"
                />
              ) : (
                <div>Select an Image</div>
              )}
              {/* File input for selecting an image */}
              <input
                type="file"
                onChange={handleFatherFileChange}
                className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5"
              />
            </div>
            <div className="p-4">
              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Name
                </label>
                <input
                  {...register("fatherName", { required: true })}
                  className=" w-full
            border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  placeholder="Enter Father Name"
                  value={fatherName}
                  onChange={(e) => {
                    setFatherName(e.target.value), setFatherError(false);
                  }}
                />{" "}
                {fatherError && (
                  <span className="text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>

              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Date Of Birth
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className=" w-full
            border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  selected={fatherDob}
                  onChange={(date) => setFatherDob(date)}
                />{" "}
              </div>
              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Date Of Death
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className=" w-full
            border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  selected={fatherDod}
                  onChange={(date) => setFatherDod(date)}
                />
              </div>
              {/* {props.currentDetails !== "Parents Details" ? (
            <div className="flex justify-end">
              <button
                className="btn btn-error text-white  m-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                className="btn btn-success text-white  m-2"
                onClick={() => formSubmitHandler()}
              >
                Submit
              </button>
            </div>
          ) : null} */}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center my-5 p-5 sm:p-0">
        <div className="">
          <form
            className="grid grid-cols-1 sm:grid-cols-2  p-0 
    border-4 border-emerald-400 rounded-lg   "
          >
            <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-lg p-4">
              {motherImg ? (
                <img
                  className="rounded-full w-36 h-36 sm:w-44 sm:h-44 border-4"
                  src={motherPreviewImg}
                  alt="Member"
                />
              ) : (
                <div>Select an Image</div>
              )}
              {/* File input for selecting an image */}
              <input
                type="file"
                onChange={handleMotherFileChange}
                className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5"
              />
            </div>
            <div className="p-4">
              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Name
                </label>
                <input
                  {...register("motherName", { required: true })}
                  className=" w-full
           border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  placeholder="Enter Mother Name"
                  value={motherName}
                  onChange={(e) => {
                    setMotherName(e.target.value), setMotherError(false);
                  }}
                />{" "}
                {motherError && (
                  <span className="text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>

              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Date Of Birth
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className=" w-full
           border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  selected={motherDob}
                  onChange={(date) => setMotherDob(date)}
                />{" "}
              </div>
              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Date Of Death
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className=" w-full
           border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  selected={motherDod}
                  onChange={(date) => setMotherDod(date)}
                />
              </div>
              {/* {props.currentDetails !== "Parents Details" ? (
           <div className="flex justify-end">
             <button
               className="btn btn-error text-white  m-2"
               onClick={() => navigate("/")}
             >
               Cancel
             </button>
             <button
               className="btn btn-success text-white  m-2"
               onClick={() => formSubmitHandler()}
             >
               Submit
             </button>
           </div>
         ) : null} */}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-around">
        <button
          className="btn btn-error text-white  m-2"
          type="button"
          onClick={cancelFormSubmitHandler}
        >
          Cancel
        </button>
        <form
          className="btn btn-success text-white  m-2"
          type="submit"
          onClick={() => formSubmitHandler()}
        >
          Submit
        </form>
      </div>
    </>
  );
};

export default DetailsAddParentsModal;
