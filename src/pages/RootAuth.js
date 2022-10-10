
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";


import AuthContainer from "../layouts/AuthContainer";



export default function RootAuth() {

  let navigate = useNavigate();
  const user_name = useSelector((state) => state.user.name)

  useEffect(() => {
    if (user_name){
       return navigate("/");
    }
  },[user_name]);

  return (
    <React.Fragment>
        <AuthContainer>
          <Outlet/>
        </AuthContainer>
    </React.Fragment>
  );
}