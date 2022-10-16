
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import SettingContainer from "../layouts/SettingContainer";

export default function RootSetting() {



  return (
    <React.Fragment>
      <SettingContainer>
      <Outlet/>
      </SettingContainer>
    </React.Fragment>
  );
}