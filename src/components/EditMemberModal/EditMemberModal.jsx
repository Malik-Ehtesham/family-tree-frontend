import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  fetchMembers,
  updateMembers,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";

const EditMemberModal = () => {
  // ------VARIABLES DECALARATIONS---------

  const { id } = useParams();

  const familyTreeId = id;

  const members = useSelector((state) => state.members);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // -------USE STATES-----------
  const [genderValue, setGenderValue] = useState("male");
  const [name, setName] = useState("");

  const data = {
    name,
    gender: genderValue,
  };

  //------------HANDLERS------------
  const updateMemberHandler = () => {
    const id = members.currentMember?._id;

    dispatch(updateMembers({ data, id }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          document.getElementById("member_modal_5").close();

          dispatch(fetchMembers(familyTreeId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setGenderValue(event.target.value);
  };

  return (
    <>
      <button
        className="btn btn-success text-white my-2 w-full"
        onClick={() => document.getElementById("member_modal_5").showModal()}
      >
        Edit Member
      </button>
      <dialog id="member_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="text-center text-bold text-xl text-green-600 sm:text-2xl">
            Edit Member
          </p>
          <div className="flex flex-col justify-center items-start ">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-success w-full m-1 sm:m-2"
            />
            {errors.name && (
              <span className="fs-6 m-0 text-red-500 font-semibold">
                This field is required
              </span>
            )}
            <div className=" m-1 sm:m-2">
              <FormControl>
                <p className="">Select Your Gender</p>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={genderValue}
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
              </FormControl>
            </div>

            {/* <input
              type="text"
              placeholder="Ehtesham Zahid"
              className="input input-bordered input-success w-full m-2"
            /> */}

            {/* <div className=""> */}

            {/* <input
                type="text"
                placeholder="Enter Your Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered input-success w-full m-2"
              /> */}
            {/* </div> */}
          </div>
          <div className="flex justify-end w-full">
            <button
              className="btn btn-error text-white m-2 mb-0"
              onClick={() => document.getElementById("member_modal_5").close()}
            >
              Cancel
            </button>

            <button
              className="btn btn-success text-white m-2 mb-0"
              onClick={handleSubmit(updateMemberHandler)}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditMemberModal;
