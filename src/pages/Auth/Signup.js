import LoginIcon from "@mui/icons-material/Login";
import {
  Button, FormControl, IconButton, InputAdornment, InputLabel,
  OutlinedInput, TextField, Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signup() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePassword2 = (event) => {
    setPassword2(event.target.value);
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
          Signup
        </Typography>
        <TextField
          id="outlined-username"
          label="Username"
          value={username}
          onChange={handleChangeUsername}
        />
        <TextField
          type="email"
          id="outlined-email"
          label="Email"
          value={email}
          onChange={handleChangeEmail}
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

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
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
            label="Password"
          />
        </FormControl>

        <Button variant="contained">SIGN UP</Button>
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
            to="/auth/login"
            underline="hover"
            variant="body2"
          >
            Already have an account? Log in
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
