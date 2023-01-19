import { Grid } from '@mui/material';
import * as React from 'react';


interface TrackProgress {
  left: number,
  right: number,
  onChange: (e) => void,
}
const TrackProgress: React.FC<TrackProgress> = ({ left, right, onChange }) => {
  return (
    <Grid container>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>{left} / {right}</div>
    </Grid>
  );
}

export default TrackProgress;