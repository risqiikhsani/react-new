

import * as React from "react";
import { useEffect } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import localStorageApi from "../api/localStorageApi";

import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setUser,clearUser } from "../redux/slices/userSlice";

import { useQuery,useMutation } from "@tanstack/react-query";

import { Box } from "@mui/system";
export default function Root() {

  // const user_name = useSelector((state) => state.user.name)
  
  let navigate = useNavigate();
  const user_id = useSelector((state) => state.user.id)
  const user_email_confirmed = useSelector((state) => state.user.email_confirmed)
  const dispatch = useDispatch()


  useEffect(() => {
    const user = localStorageApi.getUser()
    console.log(user)

    // if there's user in localStorage , change user state , otherwise user state is remain null
    if(user != null){
      console.log("user information is detected in Local Storage , will redirect you to app!")
      // set user state 
      dispatch(setUser(user))
    }
    else{
      console.log("user information isn't detected in local storage, redirect to login page!")
    }
  },[])


  useEffect(() => {
    if (!user_id){
      // if there's no user in state , redirect to login page
       return navigate("/auth/login");
    }
    else if(user_id && !user_email_confirmed){
      // if email isn't comfirmed , user should confirm first
      return navigate("/auth/signup-completion")
    }
 },[user_id,user_email_confirmed]);


  return (
  <Outlet/>             
  );
}