import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

export default function ErrorAlert(props) {

  // const errorData = Object.keys(props.error.response.data)
  
  // const errorText = () => (
  //   errorData.map((key,index) => {
  //     <Typography variant='body2'>{`${key}: ${errorData[key][0]}`}</Typography>
  //   })
  // )

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>

        {props.error.response.status == "404" && <Alert severity="error"> incorrect username or password</Alert>}

      {/* <Alert severity="error">{props.error.message}</Alert> */}
      {/* <Alert severity="error">{props.error.response.data}</Alert> */}
    </Stack>
  );
}
