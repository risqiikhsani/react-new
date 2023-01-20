import * as React from "react";
import { Link } from "react-router-dom";

import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from '@mui/icons-material/People';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";




const fontDrawerColor = '#9A9FA7';
const iconDrawerColor = '#F9FAFC';

const routeDrawer = [
  {
    name: "Home",
    route: "/",
    icon: <HomeIcon sx={{ color: iconDrawerColor }} />,

  },
  {
    name: "Chats",
    route: "/chats",
    icon: <ChatIcon sx={{ color: iconDrawerColor }} />,
  },
  {
    name: "Groups",
    route: "/groups",
    icon: <WorkspacesIcon sx={{ color: iconDrawerColor }} />,
  },
  {
    name: "Friends",
    route: "/contact",
    icon: <PeopleIcon sx={{ color: iconDrawerColor }} />,
  },

];


export default function LeftDrawer(props) {
  return (
    <React.Fragment>
      <Toolbar />
      <Divider />
      <List sx={{ color: fontDrawerColor }}>
        {routeDrawer.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton component={Link} preventScrollReset={true} to={item.route} >
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: '#ECECEC' }} variant="middle" />
      <Box sx={{ p: 2, }}>
        <Typography variant="body1" gutterBottom align="center" sx={{ color: fontDrawerColor }}>
          Need help ?
        </Typography>
        <Typography variant="body2" gutterBottom align="center" sx={{ color: fontDrawerColor }}>
          Visit our CS
        </Typography>
        <Button variant="outlined" sx={{ width: '100%' }}>CS VISIT</Button>
      </Box>

    </React.Fragment>

  );
}