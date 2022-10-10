import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PeopleIcon from '@mui/icons-material/People';



import Home from "../pages/Home";
import Chat from "../pages/Chat/Chat";

const routeDrawer = [
    {
      name: "Home",
      route: "/",
      icon: <HomeIcon />,
  
    },
    {
      name: "Chats",
      route: "/chats",
      icon: <ChatIcon />,
    },
    {
      name: "Groups",
      route: "/groups",
      icon: <WorkspacesIcon />,
    },
    {
      name: "Friends",
      route: "/contact",
      icon: <PeopleIcon/>,
    },
  ];


export default function LeftDrawer(props) {
    return (
        <React.Fragment>
        <Toolbar />
        <Divider />
        <List>
            {routeDrawer.map((item) => (
            <ListItem key={item} disablePadding>
                <ListItemButton component={Link} to={item.route}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider/>
        </React.Fragment>

    );
}