import * as React from 'react';
import {CircularProgress, Box} from '@material-ui/core';

export default function ProgressCirclar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}