import AddIcon from "../../utils/Images/Icons/add.png";

const AddCard = () => {
  return (
    <div className="w-52 shadow-lg hover: border-4 border-gray-500 rounded-lg bg-neutral-100 cursor-pointer m-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
      <img src={AddIcon} className="w-52 rounded-lg" />
      <p className="text-center font-bold text-emerald-500 text-lg">Add Tree</p>
    </div>
  );
};

export default AddCard;
