import Loader from "../../utils/Spinner/Spinner.png";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-32">
      <img src={Loader} className="w-28 sm:w-32 rounded-full" />
    </div>
  );
};

export default Spinner;
