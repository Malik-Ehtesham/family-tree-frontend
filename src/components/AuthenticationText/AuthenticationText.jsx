import { TypeAnimation } from "react-type-animation";

const AuthenticationText = () => {
  return (
    <div className="hidden lg:flex justify-start flex-col   my-5 p-4">
      <p className="lg:text-6xl 2xl:text-7xl tracking-widest  leading-relaxed text-center font-black text-white  text-transparent">
        Family is not an important thing. It's everything.
      </p>
      <p className="lg:text-6xl  2xl:text-7xl tracking-widest  leading-relaxed text-center font-black text-yellow-400 text-transparent">
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "Family first.", // initially rendered starting point
            1000,
            "Love lives here.",
            1000,
            "Home is family.",
            1000,
            "Rooted in love",
            500,
          ]}
          speed={25}
          repeat={Infinity}
        />
      </p>
    </div>
  );
};

export default AuthenticationText;
// bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text
