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

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const ChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    
  }

  return (
    <React.Fragment>
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

        <Button variant="contained" onClick={login}>SIGN IN</Button>
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
