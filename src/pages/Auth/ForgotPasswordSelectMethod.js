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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Link as LinkRouter } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useMutation } from "@tanstack/react-query";
import { auth_api } from "../../api/AuthApi";
import { setSnackbar } from "../../hooks/slices/snackbarSlice";
import { useDispatch } from "react-redux";
import { setForgotPassword } from "../../hooks/slices/forgotPasswordSlice";

function ForgotPasswordMethod(props) {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePhonenumber = (event) => {
    setPhone(event.target.value);
  };

  const dispatch = useDispatch();
  const forgotPasswordHandler = useMutation(
    (data) => {
      return auth_api.forgot_password(data);
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
        dispatch(
          setForgotPassword({
            email:email,
            method:"email",
          })
        )
        props.nextStep();
      },
    }
  );

  const handleClickPhoneMethod = (event) => {
    console.log(phone);
  };

  const handleClickEmailMethod = (event) => {
    console.log(email);
    event.preventDefault();
    try {
      forgotPasswordHandler.mutate({
        email:email,
      });
    } catch (err) {
      console.log(err);
    }
  };


  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  // const [showPassword, setShowPassword] = React.useState(false);

  // const ChangeShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

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
        {props.method == "email" ? <EmailIcon /> : <PhoneAndroidIcon />}
        {props.method == "email" ? (
          <Typography variant="h5" gutterBottom>
            Recover by Email
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom>
            Recover by Phone number
          </Typography>
        )}

        {props.method == "email" ? (
          <>
            <TextField
              type="email"
              id="outlined-email"
              label="Email"
              value={email}
              onChange={handleChangeEmail}
            />
            <Button variant="contained" onClick={handleClickEmailMethod}>
              Send Code Verification
            </Button>
          </>
        ) : (
          <>
            <TextField
              type="number"
              id="outlined-phone"
              label="Phone number"
              value={phone}
              onChange={handleChangePhonenumber}
            />
            <Button variant="contained" onClick={handleClickPhoneMethod}>
              Send Code Verification
            </Button>
          </>
        )}
      </Stack>
    </React.Fragment>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ForgotPasswordSelectMethod(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      {" "}
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
        {" "}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Recover by email" {...a11yProps(0)} />
          <Tab label="Recover by phone number" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ForgotPasswordMethod 
          method="email"
          nextStep={props.nextStep} prevStep={props.prevStep}
           />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ForgotPasswordMethod 
          method="phone"
          nextStep={props.nextStep} prevStep={props.prevStep}
           />
        </TabPanel>
      </Box>
    </React.Fragment>
  );
}
