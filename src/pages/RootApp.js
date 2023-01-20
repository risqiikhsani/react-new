
import * as React from "react";
import { Outlet } from "react-router-dom";

import { ScrollRestoration } from "react-router-dom";
import AppContainer from "../layouts/AppContainer";

export default function RootApp() {



  return (
    <React.Fragment>
      <AppContainer>
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