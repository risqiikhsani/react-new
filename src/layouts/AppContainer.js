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

import LeftDrawer from "./LeftDrawer";
import RightSidePage from "./RightSidePage";



//


import { styled, alpha } from '@mui/material/styles';



import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GrassIcon from '@mui/icons-material/Grass';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import PeopleIcon from '@mui/icons-material/People';




// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));


//

// const drawerWidth = 240;
const drawerWidth = 240;
const drawerColor = "#111827";



const routeNav = [
  {
    name: "Search",
    route:"/search",
    icon: <SearchIcon />,
  },
  {
    name: "People",
    route:"/people",
    icon: <PeopleIcon />,
  },
  {
    name: "Notification",
    route:"/notification",
    icon: <NotificationsIcon />,
  },
  {
    name: "Myprofile",
    route:"/myprofile",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Setting",
    route:"/setting",
    icon: <SettingsIcon />,
  },
];

function AppContainer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  


  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* this is the NavBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button component={Link} to="/" sx={{color:'white'}} startIcon={<GrassIcon />}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              // sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
          </Button>

          {/* <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {
              routeNav.map((item) => (
              <IconButton component={Link} to={item.route} size="large" aria-label='show {item.name}' color="inherit">
                <Badge badgeContent={0} color="error">
                  {item.icon}
                </Badge>
              </IconButton>
              ))
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            sx:{
              backgroundColor:drawerColor,
            }
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <LeftDrawer/>
        </Drawer>
        {/* this is the Left Drawer (hiden when xs screen) */}
        <Drawer
          variant="permanent"
          PaperProps={{
            sx:{
              backgroundColor:drawerColor,
            }
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <LeftDrawer/>
        </Drawer>
      </Box>

      {/* this is the main page */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { md: `calc(100% - ${drawerWidth}px` },
        }}
      >
        <Toolbar />
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
