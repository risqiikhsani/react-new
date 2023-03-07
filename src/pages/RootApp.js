
import { Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { ScrollRestoration } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import localStorageApi from "../api/localStorageApi";

import { setSnackbar } from "../hooks/slices/snackbarSlice";


import AppContainer from "../layouts/AppContainer";


export const NotificationWebsocketContext = React.createContext();

export default function RootApp() {
  const dispatch = useDispatch();

  const access_token = localStorageApi.getAccessToken();

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/notification/?token=${access_token}`, {
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

    if (connectionStatus === "Open" && lastMessage !== null) {
      let txt = null;
      let message = JSON.parse(lastMessage.data);

      if (message.data !== null) {
        switch (message.data.event) {
          case "liked_post":
            txt = `${message.data.sender_name} has liked your post.`;
            break;
          case "liked_comment":
            txt = `${message.data.sender_name} has liked your comment.`;
            break;
          case "liked_reply":
            txt = `${message.data.sender_name} has liked your reply.`;
            break;
          case "commented_post":
            txt = `${message.data.sender_name} commented on your post.`;
            break;
          case "replied_comment":
            txt = `${message.data.sender_name} replied on your comment.`;
            break;
          default:
            txt = ""
            break;
        }


        dispatch(
          setSnackbar({
            event: message.type,
            string: "notification",
            detail: txt,
          })
        );

      }


    }
  }, [lastMessage])

  return (
    <React.Fragment>
      <NotificationWebsocketContext.Provider 
      value={{sendJsonMessage,lastJsonMessage}}
      >
        {lastMessage !== null && console.log(JSON.parse(lastMessage.data))}
        <AppContainer>
          <Typography sx={{ color: "greenyellow", zIndex: '2000' }}>Connection status = {connectionStatus}</Typography>

          <Outlet />
        </AppContainer>
        {/* https://reactrouter.com/en/main/components/scroll-restoration */}
        <ScrollRestoration
          getKey={(location, matches) => {
            return location.pathname;
          }}
        />
      </NotificationWebsocketContext.Provider>

    </React.Fragment>
  );
}