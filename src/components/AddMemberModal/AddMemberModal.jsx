import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createMembers,
  fetchMembers,
} from "../../store/features/members/membersSlice";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const AddMemberModal = () => {
  // -----USE STATES-----------
  const [name, setName] = useState("");
  const [genderValue, setGenderValue] = useState("male");

  // ----------VARIABLE DECALARATIONS----------
  const { id } = useParams();

  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  const errorArray = members.error?.split(". ");
  console.log(errorArray);

  const memberData = {
    name,
    gender: genderValue,
    parentId: members.currentMember?._id,
    familyTreeId: id,
  };

  // -------HANDLERS-------
  const addChildHandler = () => {
    dispatch(createMembers({ memberData, dispatch, fetchMembers }));
  };

  const handleChange = (event) => {
    setGenderValue(event.target.value);
  };

  return (
    <>
      <button
        className="btn btn-secondary my-2 w-full"
        onClick={() => document.getElementById("member_modal_4").showModal()}
      >
        Add A Child
      </button>
      <dialog id="member_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="text-center text-bold text-xl text-green-600 sm:text-2xl">
            Add A Child
          </p>

          <div className="flex flex-col justify-center items-start">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-successs w-full m-1 sm:m-2"
            />{" "}
            {members.error ? (
              <p className="fs-6 m-0 text-red-500 font-semibold">
                {errorArray.filter((error) => error.includes("name"))}
              </p>
            ) : null}
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
          </div>

          <div className="flex justify-end w-full">
            <form method="dialog">
              <button className="btn btn-error text-white m-2 mb-0">
                Cancel
              </button>
            </form>

            <button
              className="btn btn-success text-white m-2 mb-0"
              type="submit"
              onClick={addChildHandler}
            >
              Add Child
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddMemberModal;
