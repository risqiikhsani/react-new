import HomeContainer from "../layouts/AppContainer";


import * as React from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { redirect } from "react-router-dom";


import AuthContainer from "../layouts/AuthContainer";



export default function RootAuth() {
  return (
    <React.Fragment>
        <AuthContainer>
          <Outlet/>
        </AuthContainer>
    </React.Fragment>
  );
}