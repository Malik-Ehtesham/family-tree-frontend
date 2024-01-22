import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import LogoImage from "../../utils/Images/Logo/logo.jpg";
// import HeadsetImage from "../../utils/Images/icons/headset.svg";

const Footer = () => {
  return (
    <footer className=" footer-bg bg-emerald-500 p-10 pb-0  ">
      <div className="border-b-2 border-white">
        <div className="flex justify-around flex-col lg:flex-row  pb-5 md:px-16 lg:px-0">
          <div>
            <Fade direction="left">
              <img src={LogoImage} className="w-24 h-24 rounded-full mb-5" />
              <p className="text-gray-100 text-lg lg:w-96">
                Unraveling roots, weaving legacies; together, we preserve the
                tapestry of family stories, embracing connections that span
                generations.
              </p>
            </Fade>
          </div>
          <div className="flex flex-col  md:flex-row justify-between sm:w-96 mt-10">
            <Fade direction="up">
              <div className="flex flex-col">
                <header className="text-xl  text-white font-bold  mb-5">
                  Links
                </header>
                <Link
                  to="/"
                  className="link link-hover text-gray-100 hover:text-yellow-400 my-2"
                >
                  Home
                </Link>
                <Link
                  to="/trees"
                  className="link link-hover text-gray-100 hover:text-yellow-400 my-2"
                >
                  Trees
                </Link>

                <Link
                  to="/settings"
                  className="link link-hover text-gray-100 hover:text-yellow-400 my-2"
                >
                  Settings
                </Link>
              </div>
            </Fade>
            <Fade direction="up">
              <div className="flex flex-col">
                <header className="text-xl text-white font-bold mb-5">
                  Company
                </header>
                <Link
                  to="/terms-conditions"
                  className="link link-hover text-gray-100 hover:text-yellow-400
                my-2"
                >
                  Terms and Conditions
                </Link>
                <Link
                  to="/privacy-policy"
                  className="link link-hover text-gray-100 hover:text-yellow-400
                my-2"
                >
                  Privacy policy
                </Link>
                <Link
                  to="/aboutus"
                  className="link link-hover text-gray-100 hover:text-yellow-400
                my-2"
                >
                  FAQs
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-100 text-xl py-5">
        Copyright ©2023 FamilyTree.com
      </p>
    </footer>
  );
};

export default Footer;
