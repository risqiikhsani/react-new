

import * as React from "react";
import { useEffect } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";


import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

export default function Root() {

  // const user_name = useSelector((state) => state.user.name)
  
  let navigate = useNavigate();
  const user_name = useSelector((state) => state.user.name)

  useEffect(() => {
    if (!user_name){
       return navigate("/auth/login");
    }
 },[user_name]);


  return (
      <Outlet/>       
  );
}