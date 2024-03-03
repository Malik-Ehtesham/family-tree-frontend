import Header from "../Header/Header";
import DetailsSection from "../DetailsSection/DetailsSection";
import Footer from "../Footer/Footer";

const Details = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* <DetailsPageNavbar /> */}
      <Header />
      <DetailsSection />
      <Footer />
    </div>
  );
};

export default Details;
