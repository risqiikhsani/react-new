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
import { useMutation } from "@tanstack/react-query";
import { setSnackbar } from "../../hooks/slices/snackbarSlice";
import { setForgotPassword } from "../../hooks/slices/forgotPasswordSlice";
import { auth_api } from "../../api/AuthApi";




export default function ForgotPasswordConfirmCode(props) {

  const [code,setCode] = React.useState("");

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };
  
  const email = useSelector((state) => state.forgotPassword.email);
  const dispatch = useDispatch();
  const forgotPasswordCheckCode = useMutation(
    (data) => {
      return auth_api.forgot_password_check_optional(data);
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
        // save code to redux
        dispatch(
          setForgotPassword({
            code:code,
            email:email
          })
        );
        props.nextStep();
      },
    }
  );

  const handleClick = (event) => {
    console.log(email);
    event.preventDefault();
    try {
      forgotPasswordCheckCode.mutate({
        email:email,
        code:code,
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
          Confirm Code
        </Typography>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Code Sent
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={code}
            onChange={handleChangeCode}
            label="Confirm Code"
          />
        </FormControl>
        
        <Button  sx={{textTransform:'none'}}>resend code</Button>

        <Button variant="contained" onClick={handleClick}>Next</Button>


      </Stack>
    </React.Fragment>
  );
}

