import LoginIcon from "@mui/icons-material/Login";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AuthApi from "../../api/AuthApi";

import { useDispatch } from "react-redux";
import localStorageApi from "../../api/localStorageApi";
import BeatLoaderSpinner from "../../components/SuspenseFallback/BeatLoaderSpinner";
import { setSnackbar } from "../../hooks/slices/snackbarSlice";
import { setUser } from "../../hooks/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const ChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const mutation = useMutation(
    (data) => {
      return AuthApi.login(data);
    },
    {
      onError: (error, variables, context) => {
        console.log("onError runninng");
        console.log(error);
        console.log(error.message);

        dispatch(
          setSnackbar({
            type: "error",
            string: "something went wrong",
            detail: error.message,
          })
        );

        // navigate("/auth/login")
      },
      onSuccess: (data, variables, context) => {
        console.log("onSuccess running");

        // put tokens in localstorage
        localStorageApi.setUser(data.data);

        // set user state
        dispatch(setUser(data.data));
      },
    }
  );

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      mutation.mutate({
        username: username,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // if(mutation.error){
  //   return(
  //     <React.Fragment>
  //       something went wrong
  //     </React.Fragment>
  //   )
  // }

  return (
    <React.Fragment>
      {/* {
        mutation.isLoading && <ProgressTopBar />
      } */}
      {mutation.isLoading && <BeatLoaderSpinner />}
      <Box>
        <Stack
          component="form"
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          noValidate
          autoComplete="off"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          textAlign="center"
        >
          <LoginIcon />
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            id="outlined-username"
            label="Username"
            value={username}
            onChange={handleChangeUsername}
          />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ChangeShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {mutation.isError && mutation.error.response !== undefined && (
            <Alert variant="filled" severity="error">
              wrong username or password !
            </Alert>
          )}

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Remember me"
            />
          </FormGroup>
          <Button variant="contained" onClick={onSubmit}>
            LOG IN
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={2}
          >
            <Link
              component={LinkRouter}
              to="/auth/forgot-password"
              underline="hover"
              variant="body2"
            >
              Forgot Password?
            </Link>
            <Link
              component={LinkRouter}
              to="/auth/signup"
              underline="hover"
              variant="body2"
            >
              Don't have an account? Sign Up
            </Link>
          </Stack>
          <Typography variant="body2" gutterBottom>
            Copyright © Your Website 2022.
          </Typography>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
