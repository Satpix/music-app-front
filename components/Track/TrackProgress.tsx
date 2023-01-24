import { Grid } from '@mui/material';
import * as React from 'react';

import * as S from './styled';

interface TrackProgress {
  left: number,
  right: number,
  onChange: (e) => void,
  isVolume: boolean,
}
const TrackProgress: React.FC<TrackProgress> = ({ left, right, onChange, isVolume }) => {
  return (
    <Grid container justifyContent="center">
      <S.InputContainer isVolume={isVolume}>
        <input
          type="range"
          min={0}
          max={right}
          value={left}
          onChange={onChange}
        />
      </S.InputContainer>
      <div>{left} / {right}</div>
    </Grid>
  );
}

export default TrackProgress;