import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import ForestIcon from "@mui/icons-material/Forest";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";

import Logo from "../../utils/Images/Logo/logo.jpg";

export default function SwipeableTemporaryDrawer() {
  const token = localStorage.getItem("token");

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      //   className="bg-emerald-200 h-screen"
    >
      <List className="flex flex-col items-center">
        <ListItem disablePadding className=" border-b-4 border-emerald-500 p-2">
          {/* <p className=" gradient-text text-lg font-bold">Call Up!</p> */}
          <img src={Logo} className="w-16 mx-2" />{" "}
        </ListItem>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <Link to="/">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon className="text-emerald-500" />
              </ListItemIcon>
              <p className=" p-1 text-lg font-semibold  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:text-emerald-500 ">
                Home
              </p>
              {/* <ListItemText primary="Home" /> */}
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <Link to="/trees">
            <ListItemButton>
              <ListItemIcon>
                <ForestIcon className="text-emerald-500" />
              </ListItemIcon>
              <p className="p-1 text-lg font-semibold  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:text-emerald-500 ">
                Trees
              </p>
            </ListItemButton>
          </Link>
        </ListItem>
        {token ? (
          <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
            <Link to="/settings">
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon className="text-emerald-500" />
                </ListItemIcon>
                <p className=" p-1 text-lg font-semibold  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:text-emerald-500 ">
                  Settings
                </p>
              </ListItemButton>
            </Link>
          </ListItem>
        ) : (
          <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
            <Link to="/authentication/login">
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon className="text-emerald-500" />
                </ListItemIcon>
                <p className=" p-1 text-lg font-semibold  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:text-emerald-500 ">
                  Login
                </p>
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div className="  z-20  ">
      <div className=" top-4 right-4">
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <div className=" flex w-screen justify-between">
              <div className="flex justify-center items-center">
                <img src={Logo} className="w-20 mx-2 " />
              </div>
              <Button onClick={toggleDrawer(anchor, true)} className="">
                <MenuIcon fontSize="large" className="text-emerald-500" />
              </Button>
            </div>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
