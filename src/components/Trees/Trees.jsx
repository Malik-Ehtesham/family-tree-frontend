import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TreesSection from "../TreesSection/TreesSection";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { fetchTrees } from "../../store/features/trees/treesSlice";

const Trees = () => {
  const dispatch = useDispatch();
  // -------USE EFFECT-----------
  useEffect(() => {
    dispatch(fetchTrees());
  }, []);
  const trees = useSelector((state) => state.trees);
  return (
    <div className="flex justify-between flex-col min-h-screen ">
      <Header />
      {trees.loading ? <Spinner /> : <TreesSection />}

      <Footer />
    </div>
  );
};

export default Trees;
