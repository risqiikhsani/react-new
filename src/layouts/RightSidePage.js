
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

import Home from "../pages/Home";
import Chat from "../pages/Chat/Chat";



export default function RightSidePage(props) {
    return (
    <div>
    <Toolbar />
    <Divider />
    <ListItem disablePadding>
        <ListItemButton>
        <ListItemText primary="Coming soon...." />
        </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
        <ListItemButton>
        <ListItemText primary="Coming soon...." />
        </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
        <ListItemButton>
        <ListItemText primary="Coming soon...." />
        </ListItemButton>
    </ListItem>
    </div>
    );
}