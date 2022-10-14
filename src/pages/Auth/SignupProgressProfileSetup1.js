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
  const [id,setId] = React.useState("");
  
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeId = (event) => {
    setId(event.target.value);
  };
 


  return (
    <React.Fragment>
      <Stack
        component="form"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        noValidate
        autoComplete="off"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        textAlign="center"
      >
        <Typography variant="h5" gutterBottom sx={{my:'20px'}}>
          Set up user profile
        </Typography>

        <TextField
          error
          id="outlined-id"
          label="public id"
          value={id}
          onChange={handleChangeId}
          helperText="public id was taken."
        />

        <TextField
          id="outlined-name"
          label="Profile name"
          value={name}
          onChange={handleChangeName}
        />

        

        

        <Button variant="contained">Next</Button>


      </Stack>
    </React.Fragment>
  );
}

