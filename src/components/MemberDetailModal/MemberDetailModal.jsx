import { useSelector } from "react-redux";
import { parseISO } from "date-fns";
const MemberDetailModal = () => {
  const members = useSelector((state) => state.members);
  return (
    <div>
      <dialog id="member_modal_1" className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex justify-center bg-emerald-400 rounded-lg p-4 ">
            <img
              className="rounded-full w-36 h-36 border-4 "
              src={members.currentMember?.img}
            />
          </div>
          <div className="p-4">
            <div className="my-2">
              <label className="text-sm sm:text-base font-semibold">Name</label>
              <p
                className="
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide "
              >
                {members.currentMember?.name
                  ? members.currentMember.name
                  : "Undefined"}
              </p>
            </div>
            <div className="my-2">
              <label className="text-sm sm:text-base font-semibold">
                Gender
              </label>
              <p
                className="
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold  tracking-wide "
              >
                {members.currentMember?.gender
                  ? members.currentMember.gender
                  : "Undefined"}
              </p>
            </div>{" "}
            <div className="my-2">
              <label className="text-sm sm:text-base font-semibold">
                Date Of Birth
              </label>
              <p
                className="
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide  "
              >
                {members.currentMember?.dob
                  ? parseISO(members.currentMember.dob).toLocaleDateString()
                  : "Undefined"}
              </p>
            </div>
            <div className="my-2">
              <label className="text-sm sm:text-base font-semibold">
                Date Of Birth
              </label>
              <p
                className="
                border-2 rounded-lg sm:text-lg border-emerald-400 p-2 sm:p-3 font-semibold tracking-wide  "
              >
                {members.currentMember?.dod
                  ? parseISO(members.currentMember.dod).toLocaleDateString()
                  : "Undefined"}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MemberDetailModal;
