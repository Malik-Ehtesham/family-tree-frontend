/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import ProfileImage from "../../utils/Images/Icons/profile2.jpg";
import FemaleProfileImage from "../../utils/Images/Icons/profile-female.jpg";

import "react-datetime/css/react-datetime.css";

import "react-datepicker/dist/react-datepicker.css";
import {
  updateMembers,
  fetchMembers,
  fetchSingleMember,
  createSpouse,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const DetailsAddSpouseModal = (props) => {
  //   ------------USE STATES---------------
  const [name, setName] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [img, setImg] = useState(ProfileImage);
  const [previewImg, setPreviewImg] = useState(ProfileImage);

  //   ------------VAIRABLE DECLARATIONS---------------
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();

  //   console.log(data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   ---------HANDLERS----------

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const formSubmitHandler = () => {
    const id = localStorage.getItem("inviteCode");
    dispatch(fetchSingleMember(id))
      .then((result) => {
        console.log(result);
        if (result.meta.requestStatus === "fulfilled") {
          const pid = localStorage.getItem("inviteCode");
          const data = new FormData();
          data.append("name", name);
          data.append("gender", gender);
          data.append("img", img);
          data.append("dob", dob);
          data.append("dod", dod);
          data.append("pids", pid);
          data.append("familyTreeId", result.payload.familyTreeId);
          dispatch(createSpouse({ spouseData: data, dispatch, fetchMembers }))
            .then((result) => {
              console.log(result);
              if (result.meta.requestStatus === "fulfilled") {
                localStorage.setItem("numberOfChildren", numberOfChildren);
                localStorage.setItem(
                  "familyTreeId",
                  result.payload.newSpouseDocument.familyTreeId
                );
                if (result.payload.newSpouseDocument.gender === "male") {
                  localStorage.setItem(
                    "fatherId",
                    result.payload.newSpouseDocument.id
                  );
                  localStorage.setItem("motherId", "");
                } else if (
                  result.payload.newSpouseDocument.gender === "female"
                ) {
                  localStorage.setItem(
                    "motherId",
                    result.payload.newSpouseDocument.id
                  );
                  localStorage.setItem("fatherId", "");
                }
                props.setSpouseButtonIsActive(false);
                props.setChildButtonIsActive(true);
                props.setCurrentDetails("Child Details");
                toast.success("Spouse Added Successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center my-5 p-5 sm:p-0">
      <div className="">
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="grid grid-cols-1 sm:grid-cols-2  p-0 
       border-4 border-emerald-400 rounded-lg   "
        >
          <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-lg p-4">
            {img ? (
              <img
                className="rounded-full w-36 h-36 sm:w-44 sm:h-44 border-4"
                src={previewImg}
                alt="Member"
              />
            ) : (
              <div>Select an Image</div>
            )}
            {/* File input for selecting an image */}
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5"
            />
          </div>
          <div className="p-4">
            <div className="my-2 flex flex-col">
              <label className="text-sm sm:text-base font-semibold">Name</label>
              <input
                {...register("name", { required: true })}
                className=" w-full
              border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
              {errors.name && (
                <span className="text-red-500 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-sm sm:text-base font-semibold">
                Number Of Children
              </label>
              <input
                {...register("number", { required: true })}
                type="number"
                className=" w-full
              border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                placeholder="Enter Number"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
              />{" "}
              {errors.number && (
                <span className="text-red-500 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            {props.currentDetails !== "Parents Details" ? (
              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Gender
                </label>

                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </div>
            ) : null}

            <div className="my-2 flex flex-col">
              <label className="text-sm sm:text-base font-semibold">
                Date Of Birth
              </label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                className=" w-full
              border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                selected={dob}
                onChange={(date) => setDob(date)}
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
                selected={dod}
                onChange={(date) => setDod(date)}
              />
            </div>
            {props.currentDetails !== "Parents Details" ? (
              <div className="flex justify-end">
                <button
                  className="btn btn-error text-white  m-2"
                  type="button"
                  onClick={() => {
                    props.setSpouseButtonIsActive(false);
                    props.setParentsButtonIsActive(true);
                    props.setCurrentDetails("Parents Details");
                  }}
                >
                  Skip
                </button>
                <button
                  className="btn btn-success text-white  m-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
    // <div className={`flex justify-center `}>
    //   <div
    //     className={`modal-box p-0
    //      border-4 border-emerald-400 rounded-lg    `}
    //   >
    //     <form onSubmit={formSubmitHandler}>
    //       <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-lg p-4">
    //         {img ? (
    //           <img
    //             className="rounded-full w-36 h-36 border-4"
    //             src={previewImg}
    //             alt="Member"
    //           />
    //         ) : (
    //           <div>Select an Image</div>
    //         )}
    //         {/* File input for selecting an image */}
    //         <input
    //           type="file"
    //           onChange={handleFileChange}
    //           className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5"
    //         />
    //       </div>
    //       <div className="p-4">
    //         <div className="my-2 flex flex-col">
    //           <label className="text-sm sm:text-base font-semibold">Name</label>
    //           <input
    //             className=" w-full
    //             border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
    //             placeholder="Enter Name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />{" "}
    //         </div>
    //         {props.currentDetails !== "Parents Details" ? (
    //           <div className="my-2 flex flex-col">
    //             <label className="text-sm sm:text-base font-semibold">
    //               Gender
    //             </label>

    //             <RadioGroup
    //               aria-labelledby="demo-controlled-radio-buttons-group"
    //               name="controlled-radio-buttons-group"
    //               value={gender}
    //               onChange={handleChange}
    //             >
    //               <FormControlLabel
    //                 value="female"
    //                 control={<Radio />}
    //                 label="Female"
    //               />
    //               <FormControlLabel
    //                 value="male"
    //                 control={<Radio />}
    //                 label="Male"
    //               />
    //             </RadioGroup>
    //           </div>
    //         ) : null}

    //         <div className="my-2 flex flex-col">
    //           <label className="text-sm sm:text-base font-semibold">
    //             Date Of Birth
    //           </label>
    //           <DatePicker
    //             dateFormat="dd/MM/yyyy"
    //             className=" w-full
    //             border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
    //             selected={dob}
    //             onChange={(date) => setDob(date)}
    //           />{" "}
    //         </div>
    //         <div className="my-2 flex flex-col">
    //           <label className="text-sm sm:text-base font-semibold">
    //             Date Of Death
    //           </label>
    //           <DatePicker
    //             dateFormat="dd/MM/yyyy"
    //             className=" w-full
    //             border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
    //             selected={dod}
    //             onChange={(date) => setDod(date)}
    //           />
    //         </div>
    //       </div>
    //       {props.currentDetails !== "Parents Details" ? (
    //         <div className="flex justify-end">
    //           <button
    //             className="btn btn-error text-white  m-2"
    //             onClick={() => navigate("/")}
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             className="btn btn-success text-white  m-2"
    //             onClick={() => formSubmitHandler()}
    //           >
    //             Submit
    //           </button>
    //         </div>
    //       ) : null}
    //     </form>
    //   </div>
    // </div>
  );
};

export default DetailsAddSpouseModal;
