
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppContainer from "../layouts/AppContainer";
import { ScrollRestoration } from "react-router-dom";

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