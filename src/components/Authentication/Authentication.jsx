import AuthNavbar from "../AuthNavbar/AuthNavbar";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import AuthenticationText from "../AuthenticationText/AuthenticationText";

const Authentication = () => {
  return (
    <div>
      <AuthNavbar />
      <div className="flex justify-center items-center">
        <div className=" flex justify-center items-center  lg:grid lg:grid-cols-2 lg:gap-4 sm:w-5/6  ">
          <AuthenticationText />
          <AuthenticationForm />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
