
import * as React from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";


import AppContainer from "../layouts/AppContainer";


export default function RootApp() {
  return (
    <React.Fragment>
      <AppContainer>
      <Outlet/>
      </AppContainer>
    </React.Fragment>
  );
}