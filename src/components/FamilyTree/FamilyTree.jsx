import { useDispatch, useSelector } from "react-redux";
import FamilyTreeSection from "../FamilyTreeSection/FamilyTreeSection";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Spinner from "../Spinner/Spinner";
import { fetchMembers } from "../../store/features/members/membersSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FamilyTree = () => {
  const { id } = useParams();
  const familyTreeId = id;
  const dispatch = useDispatch();
  // ---------USE EFFECTS--------------

  useEffect(() => {
    dispatch(fetchMembers(familyTreeId));
  }, []);

  const members = useSelector((state) => state.members);

  return (
    <div className="flex justify-between flex-col min-h-screen ">
      <Header />
      {members.loading ? (
        <Spinner />
      ) : (
        <FamilyTreeSection nodes={members.members} />
      )}

      <Footer />
    </div>
  );
};

export default FamilyTree;
// [
//             {
//               id: 1,
//               pids: [2],
//               name: "Amber McKenzie",
//               gender: "female",
//               img: "https://cdn.balkan.app/shared/2.jpg",
//               familyTreeId: "65a47f74979b55b97dafe083",
//             },
//             // {
//             //   id: 6,
//             //   pids: [2],
//             //   name: "Samantha McKenzie",
//             //   gender: "female",
//             //   img: "https://cdn.balkan.app/shared/2.jpg",
//             //   familyTreeId: "65a47f74979b55b97dafe083",
//             // },
//             {
//               id: 2,
//               // pids: [1, 6],
//               name: "Ava Field",
//               gender: "male",
//               img: "https://cdn.balkan.app/shared/m30/5.jpg",
//               familyTreeId: "65a47f74979b55b97dafe083",
//             },
//             {
//               id: 3,
//               mid: 1,
//               fid: 2,
//               name: "Peter Stevens",
//               gender: "male",
//               img: "https://cdn.balkan.app/shared/m10/2.jpg",
//               familyTreeId: "65a47f74979b55b97dafe083",
//             },
//             {
//               id: 4,
//               mid: 1,
//               fid: 2,
//               name: "Savin Stevens",
//               gender: "male",
//               img: "https://cdn.balkan.app/shared/m10/1.jpg",
//               familyTreeId: "65a47f74979b55b97dafe083",
//             },
//             // {
//             //   id: 5,
//             //   mid: 6,
//             //   fid: 2,
//             //   name: "Emma Stevens",
//             //   gender: "female",
//             //   img: "https://cdn.balkan.app/shared/w10/3.jpg",
//             //   familyTreeId: "65a47f74979b55b97dafe083",
//             // },
//           ]
