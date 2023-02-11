import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet } from "react-router";
import { Container, Stack } from "@mui/system";
import { IconButton, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink,Link } from "react-router-dom";

const drawerWidth = 240;

const routeDrawer = [
  {
    category: "User Settings",
    route: "/user",
    children: [
      {
        name: "Profile",
        route: "/profile",
        icon: null,
      },
      {
        name: "Account",
        route: "/account",
        icon: null,
      },
      {
        name: "Privacy & Safety",
        route: "/privacy",
        icon: null,
      },
      {
        name: "Devices",
        route: "/devices",
        icon: null,
      },
      {
        name: "Connections",
        route: "/connections",
        icon: null,
      },
    ],
  },
  {
    category: "App Settings",
    route: "/app",
    children: [
      {
        name: "Notification",
        route: "/notification",
        icon: null,
      },
      {
        name: "Media",
        route: "/media",
        icon: null,
      },
    ],
  },
  {
    category: "Activity Settings",
    route: "/activity",
    children: [
      {
        name: "History",
        route: "/history",
        icon: null,
      },
    ],
  },
];

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button startIcon={<CancelOutlinedIcon />}>ESC</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Button
            size="large"
            startIcon={<ArrowBackIosIcon fontSize="inherit" />}
            component={Link}
            to="/"
          >
            BACK
          </Button>
        </Toolbar>
        <Toolbar />

        <List>
          {routeDrawer.map((i) => (
            <React.Fragment>
              <Typography sx={{pl:'20px',py:'20px'}}>{i.category}</Typography>
              <Divider/>
              {i.children.map((a) => (
                <React.Fragment>
                  <NavLink
                  to={`/setting` + i.route + a.route} style={({isActive,isPending}) => isActive ? {color:'violet',textDecoration:'none'} : {color:"black",textDecoration:'none'}}
                  >
                  <ListItem
                    key={a.name}
                    disablePadding
                  >
                    <ListItemButton sx={{textTransform:'none'}}>
                      <ListItemIcon>{a.icon}</ListItemIcon>
                      <ListItemText primary={a.name} />
                    </ListItemButton>
                  </ListItem>
                  </NavLink>    
                </React.Fragment>
              ))}
              
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", pl: 3, pr: 10 }}
      >
        <Toolbar />
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
