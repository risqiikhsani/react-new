import { Grid, Paper, Box } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";

export default function Timeline(props) {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Paper sx={{width:'100%'}}>test</Paper>
              <Paper sx={{width:'100%'}}>test</Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>test</Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
