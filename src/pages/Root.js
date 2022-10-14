

import * as React from "react";
import { useEffect } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";


import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Box } from "@mui/system";
export default function Root() {

  // const user_name = useSelector((state) => state.user.name)
  
  let navigate = useNavigate();
  const user_id = useSelector((state) => state.user.id)
  const user_email_confirmed = useSelector((state) => state.user.email_confirmed)

  useEffect(() => {
    if (!user_id){
       return navigate("/auth/login");
    }
    else if(user_id && !user_email_confirmed){
      return navigate("/auth/signup-completion")
    }
 },[user_id,user_email_confirmed]);


  return (

<Outlet/>  
    
           
  );
}