
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

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