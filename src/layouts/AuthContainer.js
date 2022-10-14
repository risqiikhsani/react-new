import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Stack } from "@mui/system";
export default function AuthContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container  maxWidth="sm" sx={{ bgcolor:"violet"}} >

        <Outlet />

          
       
      </Container>
    </React.Fragment>
  );
}
