import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { List } from "@mui/material";
import ChatInput from "../../../components/Input/ChatInput";

import Message from "./Message";



const drawerWidth = 400;
const drawerWidthOuter = 240;
const ChatRoomBarColor = "#ffb703";

export default function ChatRoom(props) {
  const {onClose} = props;

  return (
    <React.Fragment>

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
            background: 'transparent',
            // bgcolor:ChatRoomBarColor,
          }}
        >
          <Toolbar/>
          <Toolbar/>
          <Toolbar sx={{bgcolor:"powderblue"}}>
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
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

          <Toolbar/>

        {/* <List>
          <Message />
        </List> */}

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
            bgcolor:'white'
            // background: 'transparent',
            // bgcolor:ChatRoomBarColor,
          }}
        >
          <Toolbar>
            <ChatInput />
          </Toolbar>
        </AppBar>
      
    </React.Fragment>
  );
}
