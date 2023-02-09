import * as React from "react";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import localStorageApi from "../api/localStorageApi";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../hooks/slices/userSlice";

import { useIsFetching } from "@tanstack/react-query";

import SnackbarHandler from "./App/Global/SnackbarHandler";
export default function Root() {
  const isFetching = useIsFetching();
  const dispatch = useDispatch();
  let navigate = useNavigate();



  const authenticated_user_id = useSelector((state) => state.user.id);
  const authenticated_user_email_confirmed = useSelector((state) => state.user.email_confirmed);

  const [initialRender,setInitialRender] = React.useState(true)


  useEffect(() => {
    setInitialRender(false)
    const user = localStorageApi.getUser();
    console.log(user);

    // if there's user in localStorage , change user state , otherwise user state is remain null
    if (user !== null) {
      // set user state
      dispatch(setUser({
        id: user.user.id,
        name: user.user.profile.name,
        public_username: user.user.profile.public_username,
        profile_picture: user.user.profile.profile_picture.medium,
      }));

    }

  }, []);

  useEffect(() => {
    if (!initialRender && !authenticated_user_id) {
      console.log("test root")
      console.log(authenticated_user_id)
      // if there's no user in state , redirect to login page
      return navigate("/auth/login");
    } else if (!initialRender && authenticated_user_id && !authenticated_user_email_confirmed) {
      // if email isn't comfirmed , user should confirm first
      return navigate("/auth/signup-completion");
    }
    // else{
    //   return navigate(0);
    // }
  }, [authenticated_user_id, authenticated_user_email_confirmed]);



  return (
    <React.Fragment>
      <SnackbarHandler />
      <Outlet />
    </React.Fragment>
  );
}
