// import { useState } from "react";
// import AddMemberModal from "../AddMemberModal/AddMemberModal";
// import EditMemberModal from "../EditMemberModal/EditMemberModal";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteMembers,
//   fetchMembers,
// } from "../../store/features/members/membersSlice";
// import { useParams } from "react-router-dom";

// const MemberAddModal = () => {
//   const [showModal, setShowModal] = useState(false);

//   // ----------VARIABLE DECALARATIONS----------
//   const { id } = useParams();
//   const familyTreeId = id;
//   const dispatch = useDispatch();

//   const members = useSelector((state) => state.members);

//   console.log("Balay", members.currentMember);

//   // -------HANDLERS-----------

//   const deleteMemberHandler = () => {
//     const memberId = members.currentMember._id;
//     dispatch(deleteMembers(memberId))
//       .then((result) => {
//         // Check for successful authentication
//         if (result.meta.requestStatus === "fulfilled") {
//           dispatch(fetchMembers(familyTreeId));
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         // Handle authentication failure if needed
//       });
//   };

//   return (
//     <>
//       <dialog id="member_modal_2" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             {/* if there is a button in form, it will close the modal */}
//             <button className="btn btn-sm btn-circle border-0 btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>

//           <div className="flex flex-col">
//             <form method="dialog" className="w-full">
//               <AddMemberModal />
//             </form>
//             <form method="dialog" className="w-full">
//               <EditMemberModal />
//             </form>

//             {Object.prototype.hasOwnProperty.call(
//               members.currentMember,
//               "parentId"
//             ) ? (
//               <button
//                 className="btn btn-error text-white my-2 "
//                 onClick={deleteMemberHandler}
//               >
//                 Delete Member
//               </button>
//             ) : (
//               <button
//                 className="btn btn-error text-white my-2 hover:disabled cursor-not-allowed hover:opacity-50"
//                 // onClick={deleteMemberHandler}
//               >
//                 Delete Member
//               </button>
//             )}
//           </div>
//         </div>
//       </dialog>
//     </>
//   );
// };

// export default MemberAddModal;

import { useState } from "react";
import AddMemberModal from "../AddMemberModal/AddMemberModal";
import EditMemberModal from "../EditMemberModal/EditMemberModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createChild,
  createParents,
  createSpouse,
  deleteMembers,
  fetchMembers,
  fetchSpouses,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";
import MemberSelectModal from "../MemberSelectModal/MemberSelectModal";

const MemberAddModal = () => {
  const [showModal, setShowModal] = useState(false);

  // ----------VARIABLE DECALARATIONS----------
  const { id } = useParams();
  const familyTreeId = id;
  const dispatch = useDispatch();

  const members = useSelector((state) => state.members);

  console.log("Balay", members.currentMember);

  const spouseData = {
    name: "Spouse",
    gender: "female",
    pids: members.currentMember?.id,
    familyTreeId,
  };

  const parentsData = {
    motherName: "Mother",
    fatherName: "Father",
    childId: members.currentMember?.id,
    familyTreeId,
  };

  let childData;
  if (members.currentMember.gender === "male") {
    childData = {
      name: "Child",
      gender: "male",
      pids: members.currentMember?.id,
      fatherId: members.currentMember?.id,
      motherId: members.currentMember?.pids[0],
      familyTreeId,
    };
  } else if (members.currentMember.gender === "female") {
    childData = {
      name: "Child",
      gender: "male",
      pids: members.currentMember?.id,
      motherId: members.currentMember?.id,
      fatherId: members.currentMember?.pids[0],
      familyTreeId,
    };
  }
  // -------HANDLERS-----------

  const deleteMemberHandler = () => {
    const memberId = members.currentMember._id;
    dispatch(deleteMembers(memberId))
      .then((result) => {
        // Check for successful authentication
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(fetchMembers(familyTreeId));
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle authentication failure if needed
      });
  };

  const addSpouseHandler = () => {
    console.log(spouseData);
    dispatch(createSpouse({ spouseData, dispatch, fetchMembers }));
  };

  const addParentsHandler = () => {
    console.log(parentsData);
    dispatch(createParents({ parentsData, dispatch, fetchMembers }));
  };

  const addChildHandler = () => {
    if (members.currentMember.pids.length > 1) {
      const pidsArray = members.currentMember?.pids;
      dispatch(fetchSpouses(pidsArray));
      document.getElementById("member_modal_4").showModal();
    } else if (members.currentMember.pids.length === 1) {
      dispatch(createChild({ childData, dispatch, fetchMembers }));
    } else if (members.currentMember.pids.length < 1) {
      document.getElementById("member_modal_2").close();
      dispatch(createChild({ childData, dispatch, fetchMembers }));
    }
  };

  let parentsButton;

  // Check if the object has a property named 'key' and it has a non-null value using optional chaining
  if (
    (members.currentMember?.mid === null ||
      members.currentMember?.mid === undefined) &&
    (members.currentMember?.fid === null ||
      members.currentMember?.fid === undefined)
  ) {
    // Trigger else block when both mid and fid are null or undefined
    parentsButton = (
      <button
        className="btn btn-secondary my-2 w-full"
        onClick={addParentsHandler}
      >
        Add Parents
      </button>
    );
  } else {
    // Trigger if block when either mid or fid is present and not null
    parentsButton = (
      <button className="btn btn-secondary my-2 w-full cursor-not-allowed btn-disabled">
        Add Parents
      </button>
    );
  }

  return (
    <>
      <dialog id="member_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle border-0 btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col">
            <button
              className="btn btn-primary my-2 w-full  text-white"
              onClick={addChildHandler}
            >
              Add A Child
            </button>{" "}
            {parentsButton}
            <button
              className="btn btn-error my-2 w-full text-white"
              onClick={addSpouseHandler}
            >
              Add A Spouse
            </button>
          </div>
        </div>
      </dialog>
      <MemberSelectModal />
    </>
  );
};

export default MemberAddModal;
