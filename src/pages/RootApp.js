
import { Typography } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

import { ScrollRestoration } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import localStorageApi from "../api/localStorageApi";


import AppContainer from "../layouts/AppContainer";

export default function RootApp() {

  const access_token = localStorageApi.getAccessToken();

  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/notification/?token=${access_token}`,{
    // shouldReconnect: (closeEvent) => true,
  });
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}