
import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";


import AuthContainer from "../layouts/AuthContainer";



export default function RootAuth() {

  let navigate = useNavigate();
  const authenticated_user_id = useSelector((state) => state.user.id)
  const authenticated_user_email_confirmed = useSelector((state) => state.user.email_confirmed)
  useEffect(() => {
    if (authenticated_user_id && authenticated_user_email_confirmed){
      return navigate("/");
      // return navigate(-1);
    }
  },[authenticated_user_id,authenticated_user_email_confirmed]);

  return (
    <React.Fragment>
        <AuthContainer>
          <Outlet/>
        </AuthContainer>
    </React.Fragment>
  );
}