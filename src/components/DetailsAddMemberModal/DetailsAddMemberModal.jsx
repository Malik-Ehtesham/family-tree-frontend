/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import Datetime from "react-datetime";
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
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";

const DetailsAddMemberModal = (props) => {
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const data = new FormData();
  data.append("name", name === "" ? members.currentMember?.name : name);
  data.append("gender", gender === "" ? members.currentMember?.gender : gender);
  data.append("img", img);
  data.append("dob", dob === "" ? null : dob);
  data.append("dod", dod === "" ? null : dod);
  console.log(data);

  useEffect(() => {
    const currentMember = members.currentMember;

    setName(currentMember.name || "");
    setGender(currentMember.gender || "");
    setDob(currentMember.dob ? parseISO(currentMember.dob) : "");
    setDod(currentMember.dod ? parseISO(currentMember.dod) : "");
    setImg(
      props.currentDetails === "Personal Details"
        ? currentMember.img || props.image
        : props.image
    );
    setPreviewImg(
      props.currentDetails === "Personal Details"
        ? currentMember.img || props.image
        : props.image
    );
  }, [members.currentMember, props.currentDetails]);

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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (props.currentDetails === "Personal Details") {
      const id = localStorage.getItem("inviteCode");
      dispatch(fetchSingleMember(id))
        .then((result) => {
          console.log(result);
          const familyTreeId = result.payload.familyTreeId;
          dispatch(
            updateMembers({
              memberData: data,
              id,
              dispatch,
              fetchMembers,
              familyTreeId,
            })
          )
            .then((result) => {
              console.log(result);
              props.setCurrentDetails("Spouse Details");
              window.scrollTo(0, 0);
              setName("");
              setGender("");
              setDob("");
              setDod("");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={`flex justify-center ${
        props.currentDetails === "Parents Details" ? "mb-0" : "mb-10"
      } `}
    >
      <div
        className={`modal-box p-0 
         border-4 border-emerald-400 rounded-lg ${
           props.currentDetails === "Parents Details" ? "w-96" : "w-5/6"
         }   `}
      >
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
              <label className="text-sm sm:text-base font-semibold">Name</label>
              <input
                className=" w-full
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
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
          </div>
          {props.currentDetails !== "Parents Details" ? (
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
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default DetailsAddMemberModal;

// import { useState } from "react";

// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";

// const DetailsAddMemberModal = () => {
//   const [img, setImg] = useState(null);
//   const [previewImg, setPreviewImg] = useState(null);
//   const [gender, setGender] = useState("");

//   //   ---------HANDLERS----------

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImg(file);
//     // Read the file as a data URL
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewImg(reader.result);
//       console.log(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleChange = (event) => {
//     setGender(event.target.value);
//   };

//   return (
// <div className="flex justify-center mb-10 ">
//   <div className="modal-box p-0 border-4 border-emerald-400 rounded-lg   ">
//         <form className="">
//           <div className="flex flex-col items-center justify-center bg-emerald-400 rounded-sm p-4">
//             {img ? (
//               <img
//                 className="rounded-full w-36 md:w-40 h-36 md:h-40 border-4"
//                 src={previewImg}
//                 alt="Member"
//               />
//             ) : (
//               <div>Select an Image</div>
//             )}
//             {/* File input for selecting an image */}
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5"
//             />
//           </div>
//           <div className=" p-2">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="input input-bordered input-success w-full my-2 "
//             />
//             <input
//               type="text"
//               placeholder="Family Name"
//               className="input input-bordered input-success w-full my-2"
//             />
//             <input
//               type="text"
//               placeholder="Date Of Birth"
//               className="input input-bordered input-success w-full  my-2"
//             />
//             <input
//               type="text"
//               placeholder="Date Of Death"
//               className="input input-bordered input-success w-full  my-2"
//             />
//           </div>
//           <div className="my-2 flex flex-col">
//             <label className="text-sm sm:text-base font-semibold">Gender</label>

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
//               <FormControlLabel value="male" control={<Radio />} label="Male" />
//             </RadioGroup>
//           </div>

//   <div className="flex justify-end">
//     <button className="btn btn-error text-white  m-2">Cancel</button>
//     <button className="btn btn-success text-white  m-2">Submit</button>
//   </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DetailsAddMemberModal;
