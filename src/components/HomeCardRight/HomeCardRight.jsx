import { useMediaQuery } from "react-responsive";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const HomeCardRight = (props) => {
  const isLg = useMediaQuery({ maxWidth: 1024 });
  return isLg ? (
    <div className=" feature-card-bg flex justify-center">
      <div className="sm:w-5/6">
        <div className=" grid grid-cols-1  lg:grid-cols-2   lg:my-12 pb-12 sm:pb-0">
          <div className="p-4 sm:py-12">
            {/* <p className="text-3xl md:text-5xl text-white font-black my-6">
              {props.title}
            </p> */}
            <p className="text-gray-600 font-semibold text-xl sm:text-2xl md:text-3xl tracking-wider">
              {props.description}
            </p>
            <Link
              to="/trees"
              className=" text-white bg-emerald-400  hover:bg-emerald-500  font-semibold btn sm:btn-lg rounded-full  p-4 px-8 my-6 sm:my-12"
            >
              Get Started
            </Link>
          </div>
          <Fade direction="left">
            <div className="p-2 flex justify-center my-12">
              <img
                src={props.image}
                className="w-5/6 sm:w-3/5 border-4 rounded-lg border-emerald-500 lg:my-12 xl:my-0"
              />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  ) : (
    <div className="feature-card-bg flex justify-center">
      <div className="sm:w-5/6">
        <div className=" grid grid-cols-1  lg:grid-cols-2 lg:my-12 pb-12 sm:pb-0">
          <Fade direction="left">
            <div className="p-2 flex justify-center">
              <img
                src={props.image}
                className="w-5/6 sm:w-3/5 border-4 rounded-lg border-emerald-500 lg:my-12 xl:my-0"
              />
            </div>
          </Fade>
          <div className="p-4 ">
            {/* <p className="text-3xl md:text-5xl text-white font-black my-6">
              {props.title}
            </p> */}
            <p className="text-gray-600 font-semibold text-3xl tracking-wider">
              {props.description}
            </p>

            <Link
              to="/trees"
              className="  text-white bg-emerald-400  hover:bg-emerald-500  font-semibold btn btn-lg rounded-full  p-4 px-8 my-6 sm:my-12"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCardRight;
