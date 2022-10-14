
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";


import AuthContainer from "../layouts/AuthContainer";



export default function RootAuth() {

  let navigate = useNavigate();
  const user_id = useSelector((state) => state.user.id)
  const user_email_confirmed = useSelector((state) => state.user.email_confirmed)
  useEffect(() => {
    if (user_id && user_email_confirmed){
      return navigate("/");
    }
  },[user_id,user_email_confirmed]);

  return (
    <React.Fragment>
        <AuthContainer>
          <Outlet/>
        </AuthContainer>
    </React.Fragment>
  );
}