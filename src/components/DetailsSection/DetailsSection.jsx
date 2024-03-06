// import { useEffect, useState } from "react";
// import AddMemberModal from "../AddMemberModal/AddMemberModal";
// import DetailsAddMemberModal from "../DetailsAddMemberModal/DetailsAddMemberModal";
// import UserIcon from "../../utils/Images/Icons/user.png";

// import ProfileImage from "../../utils/Images/Icons/profile2.jpg";

// import FemaleProfileImage from "../../utils/Images/Icons/profile-female.jpg";

// import DetailsAddSpouseModal from "../DetailsAddSpouseModal/DetailsAddSpouseModal";
// import DetailsAddParentsModal from "../DetailsAddParentsModal/DetailsAddParentsModal";
import DetailsAddPersonalModal from "../DetailsAddPersonalModal/DetailsAddPersonalModal";
// import DetailsAddChildModal from "../DetailsAddChildModal/DetailsAddChildModal";

// const DetailsSection = () => {
//   const [currentButton, setCurrentButton] = useState("Personal Details");
//   const [personalButtonIsActive, setPersonalButtonIsActive] = useState(true);
//   const [spouseButtonIsActive, setSpouseButtonIsActive] = useState(false);
//   const [childButtonIsActive, setChildButtonIsActive] = useState(false);
//   const [parentsButtonIsActive, setParentsButtonIsActive] = useState(false);

//   return (
//     <div className="flex justify-center ">
//       <div className="sm:w-5/6">
//         <div className="flex flex-col min-[450px]:flex-row justify-center   items-center my-5 mt-10">
//           {personalButtonIsActive ? (
//             <button
//               className={`btn  text-white m-1 ${
//                 currentButton === "Personal Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//               onClick={() => setCurrentButton("Personal Details")}
//             >
//               Personal Details
//             </button>
//           ) : (
//             <button
//               className={`btn  text-white m-1 cursor-not-allowed hover:bg-gray-400 ${
//                 currentButton === "Personal Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//             >
//               Personal Details
//             </button>
//           )}
//           {spouseButtonIsActive ? (
//             <button
//               className={`btn  text-white m-1 ${
//                 currentButton === "Spouse Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//               onClick={() => setCurrentButton("Spouse Details")}
//             >
//               Spouse Details
//             </button>
//           ) : (
//             <button
//               className={`btn  text-white m-1  cursor-not-allowed hover:bg-gray-400 ${
//                 currentButton === "Spouse Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//             >
//               Spouse Details
//             </button>
//           )}
//           {childButtonIsActive ? (
//             <button
//               className={`btn  text-white m-1 ${
//                 currentButton === "Child Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//               onClick={() => setCurrentButton("Child Details")}
//             >
//               Child Details
//             </button>
//           ) : (
//             <button
//               className={`btn  text-white m-1 cursor-not-allowed hover:bg-gray-400 ${
//                 currentButton === "Child Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//             >
//               Child Details
//             </button>
//           )}

//           {parentsButtonIsActive ? (
//             <button
//               className={`btn  text-white m-1 ${
//                 currentButton === "Parents Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//               onClick={() => setCurrentButton("Parents Details")}
//             >
//               Parents Details
//             </button>
//           ) : (
//             <button
//               className={`btn  text-white m-1   cursor-not-allowed hover:bg-gray-400 ${
//                 currentButton === "Parents Details"
//                   ? "btn-warning"
//                   : "btn-secondary"
//               }`}
//             >
//               Parents Details
//             </button>
//           )}
//         </div>
//         {/* <DetailsAddChildModal /> */}
//         {currentButton === "Personal Details" ? (
//           <DetailsAddPersonalModal
//             setPersonalButtonIsActive={setPersonalButtonIsActive}
//             setSpouseButtonIsActive={setSpouseButtonIsActive}
//             setCurrentDetails={setCurrentButton}
//           />
//         ) : null}
//         {currentButton === "Spouse Details" ? (
//           <DetailsAddSpouseModal
//             setCurrentDetails={setCurrentButton}
//             setSpouseButtonIsActive={setSpouseButtonIsActive}
//             setParentsButtonIsActive={setParentsButtonIsActive}
//             setChildButtonIsActive={setChildButtonIsActive}
//           />
//         ) : null}
//         {currentButton === "Child Details" ? (
//           <DetailsAddChildModal
//             setCurrentDetails={setCurrentButton}
//             setChildButtonIsActive={setChildButtonIsActive}
//             setParentsButtonIsActive={setParentsButtonIsActive}
//           />
//         ) : null}
//         {currentButton === "Parents Details" ? (
//           <>
//             <DetailsAddParentsModal setCurrentDetails={setCurrentButton} />
//           </>
//         ) : null}

//         {/* {currentButton === "Parents Details" ? (
//           <>
//             <div className="flex flex-col md:flex-row justify-center   ">
//               <DetailsAddMemberModal
//                 currentDetails={currentButton}
//                 image={UserIcon}
//               />
//               <DetailsAddMemberModal
//                 image={UserIcon}
//                 currentDetails={currentButton}
//                 member="Female"
//               />
//             </div>
//             <div className="flex justify-around">
//               <button
//                 className="btn btn-error text-white  m-2"
//                 onClick={() => navigate("/")}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-success text-white  m-2"
//                 onClick={() => formSubmitHandler()}
//               >
//                 Submit
//               </button>
//             </div>
//           </>
//         ) : (
//           <DetailsAddMemberModal
//             currentDetails={currentButton}
//             setCurrentDetails={setCurrentButton}
//             image={UserIcon}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default DetailsSection;

import React from "react";

const DetailsSection = () => {
  return <DetailsAddPersonalModal />;
};

export default DetailsSection;
