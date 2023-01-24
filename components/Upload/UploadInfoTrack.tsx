import { Grid, TextField } from '@mui/material';
import * as React from 'react';

const UploadInfoTrack = ({ values }) => {
  return (
    <Grid container direction={"column"} sx={{ padding: 5 }}>
      <TextField
        {...values.name}
        sx={{ marginTop: '10px', width: '400px' }}
        label={"Name of the track"}
      />
      <TextField
        {...values.artist}
        sx={{ marginTop: '10px', width: '400px' }}
        label={"Artist"}
      />
      <TextField
        {...values.text}
        sx={{ marginTop: '10px', width: '400px' }}
        label={"Lyrics for the track"}
        multiline
        rows={3}
      />
    </Grid>
  );
}

export default UploadInfoTrack;