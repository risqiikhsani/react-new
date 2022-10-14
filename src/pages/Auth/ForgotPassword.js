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

const steps = ["Select Recover Method", "Confirm Code Sent", "Reset Password"];

export default function ForgotPassword() {
  const [progress, setProgress] = React.useState(0);

  // perhatikan ini
  const nextStep = () => {
    setProgress(progress + 1);
  };

  const handleBackButton = () => {
    if (progress > 0) {
      if (progress < 3) {
        setProgress(0);
      }
      setProgress(progress - 1);
    }
  };

  return (
    <React.Fragment>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        textAlign="center"
      >
        <Box sx={{ width: "100%" }}>


          {
            progress>0 && (
                <Button onClick={handleBackButton} sx={{ m: 2 }} startIcon={<ArrowBackIosIcon />}>
                back
              </Button>
            )
          }

          <Stepper activeStep={progress} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {progress == 0 ? (
          <ForgotPasswordSelectMethod />
        ) : progress == 1 ? (
          <ForgotPasswordConfirmCode />
        ) : progress == 2 ? (
          <ForgotPasswordResetPassword />
        ) : (
          <ForgotPasswordDone />
        )}

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          textAlign="center"
        >
          <Link
            component={LinkRouter}
            to="/auth/login"
            underline="hover"
            component="button"
            variant="body2"
          >
            Already have an account? Log in
          </Link>
          <Link
            component={LinkRouter}
            to="/auth/signup"
            underline="hover"
            component="button"
            variant="body2"
          >
            Don't have an account? Sign Up
          </Link>
          <Typography variant="body2" gutterBottom>
            Copyright © Your Website 2022.
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
