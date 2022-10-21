import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressTopBar() {
  return (
    <Box sx={{ width: '100%',position:'fixed',top:0,left:0,zIndex:'99999' }}>
      <LinearProgress />
    </Box>
  );
}
