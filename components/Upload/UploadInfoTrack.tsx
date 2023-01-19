import { Grid, TextField } from '@mui/material';
import * as React from 'react';

const UploadInfoTrack = ({ values }) => {
  return (
    <Grid container direction={"column"} sx={{ padding: 20 }}>
      <TextField
        {...values.name}
        sx={{ marginTop: '10px' }}
        label={"Название трека"}
      />
      <TextField
        {...values.artist}
        sx={{ marginTop: '10px' }}
        label={"Имя исполнителя"}
      />
      <TextField
        {...values.text}
        sx={{ marginTop: '10px' }}
        label={"Слова к треку"}
        multiline
        rows={3}
      />
    </Grid>
  );
}

export default UploadInfoTrack;