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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ForgotPasswordConfirmCode from "./ForgotPasswordConfirmCode";
import ForgotPasswordSelectMethod from "./ForgotPasswordSelectMethod";
import ForgotPasswordResetPassword from "./ForgotPasswordResetPassword";
import ForgotPasswordDone from "./ForgotPasswordDone";


export default function SignupProgressVerifyEmail(){
    return(
        <React.Fragment>
                  <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        textAlign="center"
      >
        <Typography>Verify your email address</Typography>
        <Typography>You will need to verify your email address to complete registration</Typography>
        <Button>Click to verify</Button>
      </Stack>
        </React.Fragment>
    )
}