import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function AccountSettings() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: '50px' }}>Account Settings</Typography>


      <Stack
        direction="column"
        spacing={2}
        sx={{
        p:'20px',
        borderRadius:'20px',
        boxShadow:2,
        mb:'20px',
      }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="column"
          >
            <Typography>EMAIL</Typography>
            <Typography>risqiikhsani@gmail.com</Typography>
          </Stack>
          <Button size="small" variant="contained" sx={{ textTransform: 'none' }}>Edit</Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="column"
          >
            <Typography>PHONE NUMBER</Typography>
            <Typography>+628121212121</Typography>
          </Stack>
          <Button size="small" variant="contained" sx={{ textTransform: 'none' }}>Edit</Button>
        </Stack>
      </Stack>
      <Typography variant="h6">Password and Authentication</Typography>
      <Button variant="contained" sx={{ textTransform: 'none' }}>Change Password</Button>
      <Divider sx={{ my: '20px' }} />
      <Typography variant="h6">TWO-FACTOR AUTHENTICATION</Typography>
      <Typography>Protect your account with an extra layer of security.
        Once configured, you'll be required to enter both your password and an authentication code from your mobile phone in order to sign in.</Typography>
      <Button variant="contained" sx={{ textTransform: 'none' }}>Enable Two-Factor Auth</Button>
      <Divider sx={{ my: '20px' }} />
      <Typography variant="h6">ACCOUNT REMOVAL</Typography>
      <Typography>Disabling your account means you can recover it at anytime after taking this action.</Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >

        <Button variant="contained" color="error" sx={{ textTransform: 'none' }}>Disable Account</Button>
        <Button variant="outlined" color="error" sx={{ textTransform: 'none' }}>Delete Account</Button>
      </Stack>
    </Container>
  );
}