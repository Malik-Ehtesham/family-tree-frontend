/* eslint-disable react/prop-types */
import TreeIcon from "../../utils/Images/Icons/tree.png";
import AddIcon from "../../utils/Images/Icons/add.png";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import AddTreeModal from "../AddTreeModal/AddTreeModal";
import { deleteTrees, fetchTrees } from "../../store/features/trees/treesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

const TreeCard = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();

  const id = props.id;

  const copyToClipboard = async () => {
    const treeLink = `${window.location.origin}/familytree/${id}`;

    try {
      await navigator.clipboard.writeText(treeLink);
      setIsCopied(true);
      toast.success("Link Copied!", {
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

  // ------HANDLERS------------
  const deleteTreeHandler = () => {
    dispatch(deleteTrees({ id, dispatch, fetchTrees }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Tree Deleted!", {
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
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {props.add ? (
        <AddTreeModal />
      ) : (
        <>
          <Link to={`/familyTree/${props.id}`}>
            <div className="w-36 sm:w-52 shadow-lg hover: border-4 border-gray-500 rounded-lg bg-neutral-100 cursor-pointer mx-5 mt-5 mb-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
              <img
                src={TreeIcon}
                className="w-36 sm:w-52 h-36 sm:h-52 rounded-lg"
              />
              <p className="text-center font-bold text-emerald-500 text-xl border-t-4 border-emerald-500 mt-2">
                {props.name}
              </p>
            </div>
          </Link>
          <div className="flex justify-between">
            <ReplyIcon
              className="text-blue-600 cursor-pointer mx-5"
              onClick={copyToClipboard}
              // onClick={deleteTreeHandler}s
            />
            <DeleteIcon
              className="text-red-600 cursor-pointer mx-5"
              onClick={deleteTreeHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TreeCard;
