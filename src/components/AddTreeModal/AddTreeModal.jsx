/* eslint-disable react/prop-types */
import { useState } from "react";
import AddIcon from "../../utils/Images/Icons/add.png";
import { createTrees, fetchTrees } from "../../store/features/trees/treesSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../../store/features/trees/treesSlice";
import {
  createMembers,
  fetchMembers,
} from "../../store/features/members/membersSlice";

const AddTreeModal = () => {
  // ----------USE STATES---------
  const [tree, setTree] = useState("");

  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();
  const trees = useSelector((state) => state.trees);

  const treeData = {
    name: tree,
  };

  //   ---------HANDLERS----------

  const submitFormHandler = () => {
    dispatch(createTrees({ treeData, dispatch, fetchTrees }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log(result);
          document.getElementById("tree_modal_3").close();
          dispatch(resetError());
          const memberData = {
            name: "Root",
            gender: "male",
            rootMember: true,
            isAdmin: true,
            familyTreeId: result.payload._id,
          };
          dispatch(createMembers({ memberData, dispatch, fetchMembers }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        onClick={() => document.getElementById("tree_modal_3").showModal()}
        className="w-36 sm:w-52  shadow-lg hover: border-4 border-gray-500 rounded-lg bg-neutral-100 cursor-pointer m-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
      >
        <img src={AddIcon} className="w-36 sm:w-52 h-36 sm:h-52 rounded-lg" />
        <p className="text-center font-bold text-emerald-500 text-lg">
          Add A Child
        </p>
      </div>
      <dialog id="tree_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="text-center text-bold text-xl text-green-600 sm:text-2xl">
            Create A Tree
          </p>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              placeholder="Tree Name"
              value={tree}
              onChange={(e) => setTree(e.target.value)}
              className="input input-bordered input-success w-full m-2"
            />
            {trees.error ? (
              <p className="fs-6 m-0 text-center text-red-500 font-semibold">
                {trees.error}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end w-full">
            <button
              className="btn btn-error text-white m-2 mb-0"
              onClick={() => {
                document.getElementById("tree_modal_3").close();
                dispatch(resetError());
              }}
            >
              Cancel
            </button>

            <button
              className="btn btn-success text-white m-2 mb-0"
              onClick={submitFormHandler}
            >
              Create
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddTreeModal;
