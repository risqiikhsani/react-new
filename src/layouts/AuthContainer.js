import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";
export default function AuthContainer() {
  return (
    <React.Fragment>
      <Box
        sx={{
          background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          height="100vh"
        >
          <CssBaseline />
          <Paper elevation={3}
            sx={{
              background:
                "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)",
              p: "20px",
              borderRadius: "20px",
              opacity: "0.9",
            }}
          >
            <Outlet />
          </Paper>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
