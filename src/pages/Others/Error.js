import { Box, Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Link as LinkRouter, useRouteError } from "react-router-dom";


const backgroundColorTheme = 'linear-gradient(to right, #fc5c7d, #6a82fb)'; //https://uigradients.com/


export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (

    <Box sx={{
      minHeight: '100vh',
      background: backgroundColorTheme,
    }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{minHeight:'100vh',}}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{bgcolor:'violet',p:'50px',borderRadius:'20px',boxShadow:2}}
        >
          <Typography fontSize={50}>Oops!</Typography>
          <Typography>Sorry , unexpected error has occurred.</Typography>
          <Typography>{error.statusText || error.message}</Typography>
          
          <Button 
          sx={{textTransform:'none'}}
          component={LinkRouter} to={`/`}
          >go to homepage</Button>
        </Stack>
      </Stack>
    </Box>

  );
}