import { useEffect, useState, useRef } from "react";

import MemberAddModal from "../MemberAddModal/MemberAddModal";
import {
  createSpouse,
  fetchMembers,
  fetchSingleMember,
  setCurrentMember,
  setShowMemberModal,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../utils/Images/Logo/logo.jpg";
import FamilyTree from "@balkangraph/familytree.js";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MemberDetailModal from "../MemberDetailModal/MemberDetailModal";
import MemberEditModal from "../MemberEditModal/MemberEditModal";
import MemberDeleteModal from "../MemberDeleteModal/MemberDeleteModal";
import CopyImage from "../../utils/icons/copy-icon.svg";
import { toast } from "react-toastify";

const FamilyTreeSection = ({ nodes }) => {
  // --------VARIABLES DECALARATIONS-----------
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  const familyTreeId = id;

  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  const divRef = useRef();

  const copyIcon = <img src={CopyImage} />;

  const inviteCode = localStorage.getItem("inviteCode");

  const copyToClipboard = async (inviteCode) => {
    const code = inviteCode;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success("Code Copied!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error copying to clipboard", error);
    }
  };

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: nodes,
      // template: "olivia",
      searchDisplayField: "name",
      showYScroll: true,
      showXScroll: true,
      nodeMouseClick: FamilyTree.action.none,
      // enableTouch: true,
      // collapse: true,
      // expand: true,
      // zoom: { speed: 130, smooth: 10 },
      // zoom: true,
      // expand: true,
      toolbar: {
        layout: true,
        zoom: true,
        fit: true,
        expandAll: false,
        fullScreen: true,
      },

      nodeMenu: {
        details: {
          text: "Details",
          onClick: (sender) => {
            const id = sender;
            dispatch(fetchSingleMember(id));

            document.getElementById("member_modal_1").showModal();
          },
        },
        edit: {
          text: "Edit",
          onClick: (sender) => {
            const id = sender;
            dispatch(fetchSingleMember(id))
              .then((result) => {
                // Check for successful authentication
                console.log(result);
                console.log("INVITECODE:", inviteCode);
                if (result.meta.requestStatus == "fulfilled") {
                  if (
                    result.payload.id === inviteCode ||
                    result.payload.mid === inviteCode ||
                    result.payload.fid === inviteCode ||
                    result.payload?.pids.includes(inviteCode)
                  ) {
                    document.getElementById("member_modal_3").showModal();
                  } else if (!inviteCode) {
                    document.getElementById("member_modal_3").showModal();
                  } else {
                    toast.error("Permession Denied!", {
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
                }
              })
              .catch((error) => {
                console.log(error);
                // Handle authentication failure if needed
              });
            // dispatch(fetchSingleMember(id));

            // document.getElementById("member_modal_3").showModal();
          },
        },
        add: {
          text: "Add",
          onClick: (sender, args) => {
            const id = sender;
            dispatch(fetchSingleMember(id))
              .then((result) => {
                // Check for successful authentication
                console.log(result);
                if (result.meta.requestStatus == "fulfilled") {
                  if (
                    result.payload.id === inviteCode ||
                    result.payload.mid === inviteCode ||
                    result.payload.fid === inviteCode ||
                    result.payload?.pids.includes(inviteCode)
                  ) {
                    document.getElementById("member_modal_2").showModal();
                  } else if (!inviteCode) {
                    document.getElementById("member_modal_2").showModal();
                  } else {
                    toast.error("Permession Denied!", {
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
                }
              })
              .catch((error) => {
                console.log(error);
                // Handle authentication failure if needed
              });
          },
        },
        remove: {
          text: "Remove",
          onClick: (sender) => {
            const id = sender;
            dispatch(fetchSingleMember(id))
              .then((result) => {
                // Check for successful authentication
                console.log(result);
                if (result.meta.requestStatus == "fulfilled") {
                  if (result.payload.id === inviteCode) {
                    document.getElementById("member_modal_5").showModal();
                  } else if (!inviteCode) {
                    document.getElementById("member_modal_5").showModal();
                  } else {
                    toast.error("Permession Denied!", {
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
                }
              })
              .catch((error) => {
                console.log(error);
                // Handle authentication failure if needed
              });
          },
        },
        copy: {
          // icon: copyIcon,
          text: "Copy Invite Code",
          onClick: (sender) => {
            const id = sender;
            dispatch(fetchSingleMember(id))
              .then((result) => {
                console.log(result);
                if (result.meta.requestStatus === "fulfilled") {
                  copyToClipboard(result.payload.id);
                }
              })
              .catch(() => {});
            // document.getElementById("member_modal_5").showModal();
          },
        },
      },

      nodeBinding: {
        field_0: "name",
        img_0: "img",
      },
      min: true,
    });

    // Cleanup function if needed
    return () => {
      // Perform any cleanup logic here
    };
  }, [nodes]);

  const handleNodeClick = () => {
    // document.getElementById("member_modal_3").showModal();
    // dispatch(setShowMemberModal());
    // console.log(nodeDatum);
    // const name = nodeDatum.name;
    // dispatch(fetchSingleMember({ name, familyTreeId }));
    // const clickedNodeData = divRef.current.getSelectedNode()?.data;
    // console.log("Clicked node data:", node);
  };

  return (
    <>
      <div
        id="tree"
        ref={divRef}
        className="border-2 border-emerald-500 rounded-lg sm:w-5/6 mx-2 sm:mx-auto my-20"
        style={{ height: "75vh" }}
      ></div>
      <MemberAddModal />
      <MemberDetailModal />
      <MemberEditModal />
      <MemberDeleteModal />
    </>
  );
};

export default FamilyTreeSection;

// import { useEffect, useState } from "react";
// import Tree from "react-d3-tree";
// import MemberModal from "../MemberModal/MemberModal";
// import {
//   fetchMembers,
//   fetchSingleMember,
//   setCurrentMember,
// } from "../../store/features/members/membersSlice";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Logo from "../../utils/Images/Logo/logo.jpg";

// const renderNodeWithCustomEvents = ({
//   nodeDatum,
//   toggleNode,
//   handleNodeClick,
// }) => (
//   <g>
//     <circle
//       r="15"
//       className=""
//       onClick={() => {
//         handleNodeClick(nodeDatum);
//       }}
//     />
//     {/* <img className="border-2 rounded-full" r="15" src={Logo} /> */}
//     <text
//       fill="black"
//       strokeWidth="1"
//       x="20"
//       y="-3"
//       onClick={toggleNode}
//       className="text-sm "
//     >
//       {nodeDatum?.name}
//     </text>
//     {nodeDatum.attributes?.gender && (
//       <text fill="black" x="20" dy="15" strokeWidth="1" className="text-sm  ">
//         {nodeDatum.attributes?.gender}
//       </text>
//     )}
//   </g>
// );

// const FamilyTreeSection = () => {
// // --------VARIABLES DECALARATIONS-----------
// const { id } = useParams();
// const familyTreeId = id;

// const dispatch = useDispatch();
// const members = useSelector((state) => state.members);

//   // ----------USE STATES-------

// const handleNodeClick = (nodeDatum) => {
//   document.getElementById("member_modal_3").showModal();
//   console.log(nodeDatum);

//   const name = nodeDatum.name;
//   dispatch(fetchSingleMember({ name, familyTreeId }));
// };

//   return (
//     <div>
//       <div className=" flex justify-center mx-0 my-10  sm:my-20  sm:mx-4">
//         <div
//           id="treeWrapper"
//           className="sm:w-5/6 h-96 border-4 border-emerald-500 rounded-lg"
//         >
//           <Tree
//             data={members.members.length === 0 ? {} : members.members}
//             translate={{ x: 200, y: 200 }}
//             renderCustomNodeElement={(rd3tProps) =>
//               renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
//             }
//           />
//           <MemberModal />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FamilyTreeSection;
