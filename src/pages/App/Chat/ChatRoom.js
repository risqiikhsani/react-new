import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import {List} from "@mui/material";
import ChatInput from "../../../components/Input/ChatInput";

import Message from "./Message";



const drawerWidth = 400;
const drawerWidthOuter = 240;
const ChatRoomBarColor = "#ffb703";

export default function ChatRoom() {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            zIndex: "1059",
            width: {
              lg: `calc(100% - ${drawerWidth + drawerWidthOuter}px)`,
              md: `calc(100% - ${drawerWidth}px)`,
            },
            ml: {
              lg: `${drawerWidth + drawerWidthOuter}px`,
              md: `${drawerWidth}px`,
            },
            background:'transparent',
            // bgcolor:ChatRoomBarColor,
          }}
        >
          <Toolbar />
          <Toolbar/>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tyler
            </Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box>
          <Toolbar />
          <List>
            <Message/>
          </List>
        </Box>
        <AppBar position="fixed" color="primary" 
        
        sx={{
          top: 'auto', bottom: 0,
          zIndex: "1059",
          width: {
            lg: `calc(100% - ${drawerWidth + drawerWidthOuter}px)`,
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            lg: `${drawerWidth + drawerWidthOuter}px`,
            md: `${drawerWidth}px`,
          },
          background:'transparent',
          // bgcolor:ChatRoomBarColor,
        }}
        >
        <Toolbar>
          <ChatInput/>
        </Toolbar>
      </AppBar>
      </Box>
    </React.Fragment>
  );
}
