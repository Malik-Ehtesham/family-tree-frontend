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

      searchFields: ["name"],
      showYScroll: true,
      showXScroll: true,
      nodeMouseClick: FamilyTree.action.none,
      scaleInitial: FamilyTree.match.boundary,
      // enableTouch: true,
      // collapse: { level: 10, allChildren: false },
      // expand: true,
      // collapse: { level: 10, allChildren: true },

      zoom: { speed: 130, smooth: 10 },
      min: true,
      // zoom: false,
      // expand: true,
      toolbar: {
        zoom: true,
        fit: true,
        // expandAll: true,
        // fullScreen: true,
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

  return (
    <>
      <div
        id="tree"
        ref={divRef}
        className="border-2 border-emerald-500 rounded-lg sm:w-5/6 mx-2 sm:mx-auto md:mt-20 mb-20"
        style={{ height: "80vh" }}
      ></div>
      <MemberAddModal />
      <MemberDetailModal />
      <MemberEditModal />
      <MemberDeleteModal />
    </>
  );
};

export default FamilyTreeSection;
