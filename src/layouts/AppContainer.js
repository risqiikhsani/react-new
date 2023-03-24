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

import LeftDrawer from "./AppContainer/LeftDrawer";
import RightDrawer from "./AppContainer/RightDrawer";
import RightSidePage from "./AppContainer/RightSidePage";

//

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GrassIcon from "@mui/icons-material/Grass";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import PeopleIcon from "@mui/icons-material/People";


import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchMenuIcon from "./Navbar/SearchMenuIcon";
import NotificationMenuIcon from "./Navbar/NotificationMenuIcon";
import ProfileMenuIcon from "./Navbar/ProfileMenuIcon";
import SettingDrawerIcon from "./Navbar/SettingDrawerIcon";
import OnlineContactIcon from "./Navbar/OnlineContactIcon";
import { useQueryClient } from "@tanstack/react-query";
import FixedBuggyToolbar from "../components/Others/FixedBuggyToolbar";

// const drawerWidth = 240;
const drawerWidth = 240;
const drawerColor = "#111827";
const BarColor = "#eaf4f4";
const backgroundColorTheme = 'linear-gradient(to right, #fc5c7d, #6a82fb)'; //https://uigradients.com/

function AppContainer(props) {
  const queryClient = useQueryClient()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const appButton = () => {
    queryClient.invalidateQueries()
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{
      display: "flex",
      minHeight: '100vh',
      background: backgroundColorTheme,
      // alignItems:'stretch',
      // backgroundImage:'https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/11/css-gradient.png?fit=1200%2C600&ssl=1',
      // backgroundRepeat:'no-repeat',
      // backgroundAttachment:'fixed',
    }}>
      <CssBaseline />
      {/* this is the NavBar */}
      <AppBar
        position="fixed"
        sx={{
          // saat screen lg,xl maka width = width - 240
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          // saat screen lg,xl  maka marginLeft =  240
          ml: { lg: `${drawerWidth}px` },
          // zIndex: (theme) => theme.zIndex.drawer + 1,
          // bgcolor:BarColor,
          // background: 'transparent',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // icon tidak tampil saat lg,xl
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            component={Link}
            to="/"
            sx={{ color: "white" }}
            startIcon={<GrassIcon />}
            onClick={appButton}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
            // sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              App
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {/* here is the icons */}

            <SearchMenuIcon />
            <OnlineContactIcon />
            <NotificationMenuIcon />
            <ProfileMenuIcon />
            <SettingDrawerIcon />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: { lg: drawerWidth }, flexShrink: { lg: 0 },
          bgcolor:"sienna",
        }}
        aria-label="drawer"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* this is the Left Drawer (in navbar) */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              // backgroundColor: drawerColor,
              background:'transparent',
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // ini drawer yang dipencet pake icon di appbar
            // xs tampilkan ~~~~ sm,md,lg,xl hilangkan
            // display: { xs: "block", sm: "none" },
            // xs,sm,md tampilkan ~~~ lg,xl hilangkan
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <LeftDrawer />
        </Drawer>
        {/* this is the Left Drawer (hiden when xs screen) */}
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              // backgroundColor: drawerColor,
              background:'transparent',
            },
          }}
          sx={{
            // ini drawer yang bukan dipencet pake icon di appbar
            // xs hilangkan ~~~ sm,md,lg,xl tampilkan
            // display: { xs: "none", sm: "block" },
            // xs,sm,md hilangkan ~~~ lg,xl tampilkan
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <LeftDrawer />
        </Drawer>
      </Box>

      {/* this is the main page */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          
          bgcolor: "thistle",
          // ml: { lg: `${drawerWidth}px` },
          //width: { lg: `calc(100% - ${drawerWidth}px` },
        }}
      >
        {/* set height to 70px because there was a BUG of toolbar's height when the resolution is at "sm" */}
        <Toolbar/>
        
        
        {props.children}
      </Box>

      {/* this is right side page */}
      {/* <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
          anchor="right"
        >
          <RightSidePage/>
        </Drawer>
      </Box> */}
    </Box>
  );
}

AppContainer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppContainer;
