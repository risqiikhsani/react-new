import * as React from "react";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import localStorageApi from "../api/localStorageApi";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../hooks/slices/userSlice";

import { useIsFetching } from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { CssBaseline } from "@mui/material";
import SnackbarHandler from "./App/Global/SnackbarHandler";

export default function Root() {
  const isDarkTheme = useSelector((state) => state.theme.darkTheme);

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
    },
    components: {
      // Name of the component ⚛️
      MuiButtonBase: {
        defaultProps: {
          // The default props to change
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            height: "70px",
          },
        },
      },
    },
  });

  const isFetching = useIsFetching();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const authenticated_user_id = useSelector((state) => state.user.id);
  const authenticated_user_email_confirmed = useSelector(
    (state) => state.user.email_confirmed
  );

  // this because the 2nd useEffect will run at initial render too , to prevent it use this technique 
  const [initialRender, setInitialRender] = React.useState(true);

  // first useEffect
  useEffect(() => {
    setInitialRender(false);
    const user = localStorageApi.getUser();
    console.log(user);

    // if there's user in localStorage , change user state , otherwise user state is remain null
    if (user !== null) {
      // set user state
      dispatch(
        setUser({
          id: user.user.id,
          name: user.user.profile.name,
          public_username: user.user.profile.public_username,
          profile_picture: user.user.profile.profile_picture.medium,
        })
      );
    } else {
      return navigate("/auth/login");
    }
  }, []);

  //second useEffect
  useEffect(() => {
    if (!initialRender && !authenticated_user_id) {
      // if there's no user in state , redirect to login page
      return navigate("/auth/login");
    } else if (
      !initialRender &&
      authenticated_user_id &&
      !authenticated_user_email_confirmed
    ) {
      // if email isn't comfirmed , user should confirm first
      return navigate("/auth/signup-completion");
    }
    // else{
    //   return navigate(0);
    // }
  }, [authenticated_user_id, authenticated_user_email_confirmed]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <SnackbarHandler />
          <Outlet />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
