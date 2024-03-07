import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TreesSection from "../TreesSection/TreesSection";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { fetchTrees } from "../../store/features/trees/treesSlice";
import { fetchCurrentUser } from "../../store/features/users/usersSlice";
import InviteCodeSection from "../InviteCodeSection/InviteCodeSection";

const Trees = () => {
  const dispatch = useDispatch();
  // -------USE EFFECT-----------
  useEffect(() => {
    dispatch(fetchTrees());
    dispatch(fetchCurrentUser());
  }, []);
  const trees = useSelector((state) => state.trees);
  const users = useSelector((state) => state.users);
  return (
    <div className="flex justify-between flex-col min-h-screen ">
      <Header />
      {trees.loading ? (
        <Spinner />
      ) : users.user?.role === "admin" ? (
        <TreesSection />
      ) : (
        <InviteCodeSection />
      )}
      <Footer />
    </div>
  );
};

export default Trees;
