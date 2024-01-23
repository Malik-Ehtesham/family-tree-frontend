import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import Datetime from "react-datetime";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import "react-datetime/css/react-datetime.css";

import "react-datepicker/dist/react-datepicker.css";
import {
  updateMembers,
  fetchMembers,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";

const MemberEditModal = () => {
  const { id } = useParams();
  const familyTreeId = id;

  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date(0, 0, 1));
  const [dod, setDod] = useState(new Date(0, 0, 1));
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const data = new FormData();
  data.append("name", name === "" ? members.currentMember?.name : name);
  data.append("gender", gender === "" ? members.currentMember?.gender : gender);
  data.append("img", img);
  data.append("dob", dob === null ? members.currentMember?.dob : dob);
  data.append("dod", dod === null ? members.currentMember?.dod : dod);

  useEffect(() => {
    const currentMember = members.currentMember;

    setName(currentMember.name || "");
    setGender(currentMember.gender || "");
    setDob(currentMember.dob ? parseISO(currentMember.dob) : new Date(0, 0, 1));
    setDod(currentMember.dod ? parseISO(currentMember.dod) : new Date(0, 0, 1));
    setImg(currentMember.img || null);
    setPreviewImg(currentMember.img || null);
  }, [members.currentMember]);

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
    // e.preventDefault();

    const id = members.currentMember.id;
    dispatch(
      updateMembers({
        memberData: data,
        id,
        dispatch,
        fetchMembers,
        familyTreeId,
      })
    );
  };

  return (
    <div>
      <dialog id="member_modal_3" className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-lg p-4">
              {img ? (
                <img
                  className="rounded-full w-36 h-36 border-4"
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
                <label className="text-sm sm:text-base font-semibold">
                  Name
                </label>
                <input
                  className=" w-full
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
              </div>
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
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </div>

              <div className="my-2 flex flex-col">
                <label className="text-sm sm:text-base font-semibold">
                  Date Of Birth
                </label>
                <DatePicker
                  // {...register("dob", { required: true })}
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
                  // {...register("dod", { required: true })}
                  dateFormat="dd/MM/yyyy"
                  className=" w-full
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                  selected={dod}
                  onChange={(date) => setDod(date)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-success text-white  my-2 mx-5">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MemberEditModal;
