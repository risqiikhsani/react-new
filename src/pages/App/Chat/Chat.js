import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChatDrawer from "./ChatDrawer";
import ChatRoom from "./ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { clearChatroom } from "../../../hooks/slices/chatroomSlice";


const drawerWidth = 400;
const drawerWidthOuter = 240;

const ChatBarColor = "#ade8f4";
function Chat(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useDispatch();
  
  const chatroomOpen = useSelector((state) => state.chatroom.open);
  const chatroomData = useSelector((state) => state.chatroom.data);

  
  
  const drawer = (
    <React.Fragment>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
          <ArrowBackIosIcon />
        </IconButton>
      </Toolbar>
      <ChatDrawer />
    </React.Fragment>

  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar
        sx={{
          width: {
            lg: `calc(100% - ${drawerWidth + drawerWidthOuter}px)`,
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            lg: `${drawerWidth + drawerWidthOuter}px`,
            md: `${drawerWidth}px`,
          },
          zIndex: "1060",
          // bgcolor: ChatBarColor,
          background: 'transparent', boxShadow: 'none',
        }}
      >
        <Toolbar />


        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>


          <Box sx={{ flexGrow: 1 }} />
          <Button
            sx={{ borderRadius: "20px", mx: '5px' }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          >
            Chat
          </Button>
          <Button
            sx={{ borderRadius: "20px", mx: '5px' }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          >
            Group Chat
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: { md: drawerWidth },
          flexShrink: { lg: 0 },
          bgcolor:'tomato',

        }}

      >
        {/* the temporary clickable drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: "1070",
            display: { xs: "block", lg: "none", },
            "& .MuiDrawer-paper": {
              // bgcolor: ChatBarColor,
              background: 'transparent',
              zIndex: "1070",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
        {/* the permanent drawer , only showed when md++ */}
        <Drawer
          variant="permanent"
          sx={{
            zIndex: "1070",
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              // bgcolor: ChatBarColor,
              background: 'transparent',
              zIndex: "1070",
              boxSizing: "border-box",
              width: drawerWidth,
              ml: { lg: `${drawerWidthOuter}px` },
            },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)`, },
          bgcolor:'red',
        }}
      >
        <Toolbar />

        {chatroomOpen && <ChatRoom/> }
        

      </Box>
    </Box>
  );
}

Chat.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Chat;
