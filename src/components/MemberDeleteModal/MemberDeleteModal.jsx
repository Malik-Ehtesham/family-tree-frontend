import { useDispatch, useSelector } from "react-redux";
import {
  deleteMembers,
  fetchMembers,
} from "../../store/features/members/membersSlice";
import { useParams } from "react-router-dom";

const MemberDeleteModal = () => {
  const { id } = useParams();
  const familyTreeId = id;

  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const deleteMemberHandler = () => {
    const memberId = members.currentMember?.id;
    dispatch(deleteMembers({ memberId, dispatch, fetchMembers, familyTreeId }));
  };

  return (
    <div>
      <dialog id="member_modal_5" className="modal">
        <div className="modal-box p-4 pt-8">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle border-none btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <p className="font-semibold text-red-500">
              Are you sure you want to delete the member?
              <span className="text-black px-1">
                (Remember this will also delete all the childs of the member)
              </span>
            </p>
            <div className="flex justify-end mt-10">
              {members.currentMember.rootMember ? (
                <button
                  className="btn btn-error text-white btn-disabled "
                  //   onClick={deleteMemberHandler}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-error text-white"
                  onClick={deleteMemberHandler}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MemberDeleteModal;
