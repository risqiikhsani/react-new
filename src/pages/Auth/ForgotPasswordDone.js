import LoginIcon from "@mui/icons-material/Login";
import {
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";



export default function ForgotPasswordDone() {


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
        <LoginIcon />
        <Typography variant="h5" gutterBottom>
          Reset password done, back to Log in !
        </Typography>

        
      </Stack>
    </React.Fragment>
  );
}
