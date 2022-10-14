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



export default function SignupProgressConfirmCode(){
    const [code,setCode] = React.useState("");

    const handleChangeCode = (event) => {
      setCode(event.target.value);
    };
  
  
  
    const [showPassword, setShowPassword] = React.useState(false);
  
    const ChangeShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
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
        <Typography>An email has been sent to kucingimut@gmail.com with a code or link to verify your account.</Typography>
        <Typography>If you have not received the email after a few minutes, please check your spam folder.</Typography>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Code Sent
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={code}
            onChange={handleChangeCode}
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
            label="Confirm Code"
          />
        </FormControl>
        <Button>Click to verify</Button>
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            >
                <Button>Resend Email</Button>
                <Button>Change Email</Button>
            </Stack>
        </Stack>
        </React.Fragment>
    )
}