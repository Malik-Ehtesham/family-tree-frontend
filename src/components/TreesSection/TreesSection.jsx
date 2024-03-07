import { useEffect } from "react";
import AddCard from "../AddCard/AddCard";
import TreeCard from "../TreeCard/TreeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrees } from "../../store/features/trees/treesSlice";
import Tree from "react-d3-tree";
import EastIcon from "@mui/icons-material/East";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Navigate, useNavigate } from "react-router-dom";
const TreesSection = () => {
  // ------VARIABLES DECALARATIONS---------

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trees = useSelector((state) => state.trees);

  return (
    <div className="flex justify-center my-5">
      <div className="sm:w-5/6">
        {/* <div className="flex justify-center sm:justify-end mx-5 mb-10">
          <button
            className="px-8 py-3 bg-emerald-400 rounded-lg font-bold hover:text-white transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 "
            onClick={() => navigate("/invitecode")}
          >
            Enter Invite Code <EastIcon className="mb-0.5" />
          </button>
        </div> */}
        {trees.trees?.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="font-black text-3xl p-4 sm:text-4xl lg:text-5xl tracking-widest text-center text-green-600 my-5  sm:my-10">
              Plant the seeds of your legacy – Create your family tree and watch
              your heritage blossom.
            </p>
            <TreeCard add={true} />
          </div>
        ) : (
          <div className="flex flex-col ">
            <p className=" text-center text-4xl sm:text-5xl text-emerald-500 mb-5  sm:my-10 font-black">
              Your Trees
            </p>
            <div className="flex justify-around  flex-wrap overflow-auto gap-y-5  items-center ">
              {trees.trees?.map((tree) => (
                <TreeCard key={tree?._id} id={tree?._id} name={tree?.name} />
              ))}
              <TreeCard add={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreesSection;
