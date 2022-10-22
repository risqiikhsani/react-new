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
import { ListItemAvatar } from "@mui/material";
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
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

import { useSelector, useDispatch } from "react-redux";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { clearUser, setUser } from "../../redux/slices/userSlice";
import localStorageAPI from "../../api/localStorageApi";

const routeMenu = [
  {
    name: "Profile",
    route: "/profile",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    name: "Settings",
    route: "/setting",
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    name: "Logout",
    route: null,
    icon: <LogoutIcon fontSize="small" />,
  },
];

export default function ProfileMenuIcon(props) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    //remove user localstorage
    localStorageAPI.removeUser();
    //remove user state
    dispatch(clearUser());
  };

  return (
    <React.Fragment>
      <Tooltip title="Profile">
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          size="large"
          aria-label="show profile"
          color="inherit"
          onClick={handleClick}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,

          sx: {
            borderRadius: "10px 5px 10px 10px",
            width: "300px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Ricks" secondary="Ricks@gmail.com" />
        </ListItem>

        <Divider />
        {routeMenu.map((data) => (
          <React.Fragment>
            <MenuItem component={Link} to={data.route} onClick={handleClose}>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText>{data.name}</ListItemText>
            </MenuItem>
          </React.Fragment>
        ))}
      </Menu>
    </React.Fragment>
  );
}
