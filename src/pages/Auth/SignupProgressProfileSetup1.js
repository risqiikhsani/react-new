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




export default function SignupProgressProfileSetup1() {

  const [name,setName] = React.useState("");
  
  const handleChangeName = (event) => {
    setName(event.target.value);
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
          Set up user profile
        </Typography>
        <TextField
          id="outlined-username"
          label="Username"
          value={name}
          onChange={handleChangeName}
        />
        

        

        <Button variant="contained">Next</Button>


      </Stack>
    </React.Fragment>
  );
}

