/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import { useForm } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DetailsAddPersonalModal = (props) => {
  //   ------------USE STATES---------------
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [img, setImg] = useState(ProfileImage);
  const [previewImg, setPreviewImg] = useState(ProfileImage);

  //   ------------VAIRABLE DECLARATIONS---------------
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = new FormData();
  data.append("name", name);
  data.append("gender", gender);
  data.append("img", img);
  data.append("dob", dob);
  data.append("dod", dod);

  console.log(data);

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

  //   const formSubmitHandler = (e) => {
  //     e.preventDefault();
  //     const id = localStorage.getItem("inviteCode");
  //     dispatch(fetchSingleMember(id))
  //       .then((result) => {
  //         console.log(result);
  //         const spouseData = {
  //           name,
  //           gender,
  //           dob,
  //           dod,
  //           img,
  //           pids: members.currentMember?.id,
  //           familyTreeId: result.payload.familyTreeId,
  //         };
  //         console.log(spouseData);
  //         dispatch(createSpouse({ spouseData, dispatch, fetchMembers }))
  //           .then((result) => {
  //             console.log(result);
  //             props.setCurrentDetails("Parents Details");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const formSubmitHandler = () => {
    const id = localStorage.getItem("inviteCode");
    dispatch(fetchSingleMember(id))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(
            updateMembers({
              memberData: data,
              id,
              dispatch,
              fetchMembers,
              familyTreeId: result.payload.familyTreeId,
            })
          )
            .then((result) => {
              console.log(result);
              if (result.meta.requestStatus === "fulfilled") {
                setName("");
                setGender("");
                setDob("");
                setDod("");
                setImg(ProfileImage);
                toast.success("Member Added Successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                props.setPersonalButtonIsActive(false);
                props.setSpouseButtonIsActive(true);
                props.setCurrentDetails("Spouse Details");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  onClick={cancelFormSubmitHandler}
                >
                  Cancel
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
  );
};

export default DetailsAddPersonalModal;
