import { useDispatch, useSelector } from "react-redux";
import {
  createChild,
  setSelectedSpouse,
  fetchMembers,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";

const MemberSelectModal = () => {
  // --------VARIABLE DECALARATIONS--------

  const { id } = useParams();
  const familyTreeId = id;

  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const selectSpouseHandler = (name, id) => {
    console.log(name, id);
    // const spouse = { name, id };
    // dispatch(setSelectedSpouse(spouse));

    let childData;
    if (members.currentMember.gender === "male") {
      childData = {
        name: "Child",
        gender: "male",
        motherId: id,
        fatherId: members.currentMember.id,
        familyTreeId,
      };
      dispatch(createChild({ childData, dispatch, fetchMembers }));
    } else if (members.currentMember.gender === "female") {
      childData = {
        name: "Child",
        gender: "male",
        fatherId: id,
        motherId: members.currentMember.id,
        familyTreeId,
      };
      dispatch(createChild({ childData, dispatch, fetchMembers }));
    }
    document.getElementById("member_modal_4").close();
  };
  return (
    <div>
      <dialog id="member_modal_4" className="modal">
        <div className="modal-box p-4">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="text-center text-2xl font-black text-emerald-600 mb-2">
            Select A Spouse
          </p>
          <div className="flex flex-col ">
            {members.spouseArray.map((spouse) => {
              console.log(spouse);
              return (
                <div key={spouse.id}>
                  <input
                    className=" input input-bordered w-full h-8  font-semibold cursor-pointer hover:bg-slate-200 m-0.5"
                    value={spouse.name}
                    readOnly
                    onClick={() => selectSpouseHandler(spouse.name, spouse.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MemberSelectModal;
