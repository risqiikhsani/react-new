import { Button, Container, Typography } from "@mui/material";
import * as React from "react";

export default function DevicesSettings() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: '50px' }}>Devices Settings</Typography>

      <Typography>Here are all the devices that are currently logged in with your account, you can log out of each one individually or all other devices.</Typography>
      <Typography>If you see an entry you don't recognize, log out of that device and change your account password immediately.</Typography>
      <Typography variant="h6">CURRENT DEVICE</Typography>
      <Typography variant="h6">OTHER DEVICES</Typography>
      <Typography variant="h6">LOG OUT OF ALL KNOWN DEVICES</Typography>
      <Typography>You'll have to log back in on all logged out devices.</Typography>
      <Button variant="outlined" color="error" sx={{ textTransform: 'none' }}>Log Out ALl Known Devices</Button>
    </Container>
  );
}