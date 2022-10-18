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
import { Avatar, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PeopleIcon from "@mui/icons-material/People";
import { TextField } from "@mui/material";
import Home from "../../pages/App/Home/Home";
import Chat from "../../pages/App/Chat/Chat";

const fontDrawerColor = "#9A9FA7";
const iconDrawerColor = "#F9FAFC";

const contact = [
  {
    id: 1,
    name: "John",
    is_online: false,
    last_online: "",
    profile_picture: "",
  },
  {
    id: 2,
    name: "Kenny",
    is_online: true,
    last_online: "",
    profile_picture: "",
  },
  {
    id: 3,
    name: "Zer",
    is_online: false,
    last_online: "",
    profile_picture: "",
  },
];

export default function RightDrawerContact(props) {
  const [name, setName] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <React.Fragment>
      <Toolbar>
        <TextField
        sx={{width:'100%',mx:'20px'}}
          id="search"
          placeholder="Search"
          value={name}
          onChange={handleChange}
          
          size="small"
        />
      </Toolbar>
      <Divider />
      <List sx={{ color: fontDrawerColor }}>
        {contact.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton component={Link} to={null}>
              <ListItemIcon>
                <Avatar src={null} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {item.is_online ? (
                <Box
                  sx={{
                    bgcolor: "green",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Typography variant="body2">3 hours ago</Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
