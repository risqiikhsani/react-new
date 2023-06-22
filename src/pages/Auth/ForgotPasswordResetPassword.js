import { Box, Stack } from "@mui/system";
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {
  Button,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { clearForgotPassword } from "../../hooks/slices/forgotPasswordSlice";
import { useMutation } from "@tanstack/react-query";
import { auth_api } from "../../api/AuthApi";
import { setSnackbar } from "../../hooks/slices/snackbarSlice";
import { memo } from "react";




export default function ForgotPasswordResetPassword(props) {

  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };



  const [showPassword, setShowPassword] = React.useState(false);

  const ChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const email = useSelector((state) => state.forgotPassword.email);
  const code = useSelector((state) => state.forgotPassword.code);
  console.log(email)
  console.log(code)
  const dispatch = useDispatch();
  const forgotPasswordConfirm = useMutation(
    (data) => {
      return auth_api.forgot_password_confirm(data);
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
      },
      onSuccess: (data, variables, context) => {
        dispatch(clearForgotPassword())
        props.nextStep();
      },
    }
  );

  const handleClick = (event) => {
    console.log("email is")
    console.log(email);
    event.preventDefault();
    try {
      forgotPasswordConfirm.mutate({
        email:email,
        code:code,
        password:password,
        confirm_password:password2,
      });
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <React.Fragment>
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
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
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
            label="New Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password2}
            onChange={handleChangePassword2}
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
            label="Confirm New Password"
          />
        </FormControl>

        <Button variant="contained" onClick={handleClick}>RESET PASSWORD</Button>


      </Stack>
    </React.Fragment>
  );
}

