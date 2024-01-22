import { useMediaQuery } from "react-responsive";

import Navbar from "../Navbar/Navbar";
import SideDrawer from "../SideDrawer/SideDrawer";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <SideDrawer /> : <Navbar />;
};

export default Header;
