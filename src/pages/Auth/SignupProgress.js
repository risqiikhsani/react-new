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

import SignupProgressVerifyEmail from "./SignupProgressVerifyEmail";
import SignupProgressConfirmCode from "./SignupProgressConfirmCode";
import SignupProgressProfileSetup1 from "./SignupProgressProfileSetup1";
import SignupProgressDone from "./SignupProgressDone";

const steps = [
  "Verify your email",
  "Confirm the code sent",
  "Set up your profile",
  "Welcome !",
];

export default function SignupProgress() {
  const [progress, setProgress] = React.useState(0);

  // perhatikan ini
  const nextStep = () => {
    setProgress(progress + 1);
  };

  const prevStep = () => {
    if (progress > 0) {
      if (progress < 3) {
        setProgress(0);
      }
      setProgress(progress - 1);
    }
  };

  return (
    <React.Fragment>
      <Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={10}
          textAlign="center"
        >
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={progress} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {progress == 0 ? (
            <SignupProgressVerifyEmail />
          ) : progress == 1 ? (
            <SignupProgressConfirmCode />
          ) : progress == 2 ? (
            <SignupProgressProfileSetup1 />
          ) : (
            <SignupProgressDone />
          )}

          <Box>
            <Typography>just trial for dev</Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={2}
            >
              <Button onClick={prevStep}>back</Button>
              <Button onClick={nextStep}>next</Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
