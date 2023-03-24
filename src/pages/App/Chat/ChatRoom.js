import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { List } from "@mui/material";

import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { clearChatroom } from "../../../hooks/slices/chatroomSlice";
import localStorageApi from "../../../api/localStorageApi";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ChatInput from "./ChatInput";



const drawerWidth = 400;
const drawerWidthOuter = 240;
const ChatRoomBarColor = "#ffb703";

export default function ChatRoom(props) {
  const { onClose } = props;

  const messagesEndRef = React.useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: "end" })
  }
  const dispatch = useDispatch();

  const chatroomOpen = useSelector((state) => state.chatroom.open);
  const chatroomData = useSelector((state) => state.chatroom.data);

  const chatRoomClickClose = () => {
    dispatch(clearChatroom())
  }

  const [messageHistory, setMessageHistory] = React.useState([]);

  const access_token = localStorageApi.getAccessToken();

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/chatroom/${chatroomData.id}/?token=${access_token}`, {
    // shouldReconnect: (closeEvent) => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];



  React.useEffect(() => {
    if (connectionStatus === "Open" && lastJsonMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastJsonMessage.data));
    }

  }, [lastJsonMessage, setMessageHistory])

  React.useEffect(() => {
    scrollToBottom()
  })

  return (
    <React.Fragment>
      {console.log(messageHistory)}
      
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
          <Toolbar />
          <Toolbar />
          <Toolbar sx={{ bgcolor: "powderblue" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar src={chatroomData.display.profile.profile_picture.small} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {chatroomData.display.profile.name}
            </Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            <IconButton onClick={chatRoomClickClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Toolbar />


          <Typography sx={{ color: "greenyellow", zIndex: '2000' }}>Connection status = {connectionStatus}</Typography>

          <List>
            {messageHistory.map((a) => (
              <React.Fragment>
                <Message key={a.id} data={a} />
              </React.Fragment>

            ))}

          </List>
        


        <Toolbar />
        <Box ref={messagesEndRef} />
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
            // bgcolor: 'white'
            background: 'transparent',
            // background: 'transparent',
            // bgcolor:ChatRoomBarColor,
          }}
        >
          <Toolbar>
            <ChatInput onSend={sendJsonMessage} />
          </Toolbar>
        </AppBar>
      
    </React.Fragment>
  );
}
