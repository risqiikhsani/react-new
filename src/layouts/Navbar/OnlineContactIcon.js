import * as React from "react";
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

import { Routes, Route, Outlet, Link } from "react-router-dom";

//

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { ListItemAvatar, Tooltip } from "@mui/material";
import {Avatar} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GrassIcon from "@mui/icons-material/Grass";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import PeopleIcon from "@mui/icons-material/People";

import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/system";
import RightDrawerContact from "../AppContainer/RightDrawerContact";


const drawerWidth = 400;
const drawerColor = "#FFFFFF";


export default function OnlineContactIcon(props) {
  const [settingOpen, setSettingOpen] = React.useState(false);
  const handleSettingDrawerToggle = () => {
    setSettingOpen(!settingOpen);
  };


  return (
    <React.Fragment>
      <Tooltip title="Contact">
      <IconButton
        size="large"
        aria-label="show setting"
        color="inherit"
        onClick={handleSettingDrawerToggle}
      >
        <Badge badgeContent={0} color="error">
          <PeopleIcon />
        </Badge>
      </IconButton>
      </Tooltip>


      <Drawer
        anchor="right"
        open={settingOpen}
        onClose={handleSettingDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: drawerColor,
            borderRadius: "20px 0 0 20px",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          zIndex: "modal",
        }}
      >
        <RightDrawerContact/>
      </Drawer>
    </React.Fragment>
  );
}
