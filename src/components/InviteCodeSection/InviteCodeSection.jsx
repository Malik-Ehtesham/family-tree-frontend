import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMemberByInviteCode } from "../../store/features/members/membersSlice";
import { useDispatch, useSelector } from "react-redux";

const InviteCodeSection = () => {
  const [inviteCode, setInviteCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(fetchMemberByInviteCode(inviteCode));
      console.log(result);

      if (result.meta.requestStatus === "fulfilled") {
        navigate(`/details`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:flex sm:justify-center px-4 my-24 md:my-28 xl:my-36">
      <div className="sm:w-5/6 border-4 rounded-lg border-emerald-500 ">
        <form className="flex flex-col px-10 py-10">
          <label className="font-semibold text-xl my-1">
            Enter Invite Code:
          </label>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Invite Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="input input-bordered text-lg input-success w-full "
            />
            {members.error ? (
              <p className="text-red-500 font-semibold">{members.error}</p>
            ) : null}
          </div>
          <div className="flex flex-col justify-between">
            <button
              className="btn text-lg btn-error text-white  my-2"
              onClick={() => navigate("/")}
            >
              Skip
            </button>
            <button
              className="btn text-lg btn-success text-white "
              onClick={submitFormHandler}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteCodeSection;
