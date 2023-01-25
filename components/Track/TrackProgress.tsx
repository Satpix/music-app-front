import { Grid } from '@mui/material';
import * as React from 'react';

import * as S from './styled';

interface TrackProgress {
  left: number,
  right: number,
  onChange: (e) => void,
  isVolume: boolean,
}

interface values {
  left: string;
  right: string;
}

const TrackProgress: React.FC<TrackProgress> = ({ left, right, onChange, isVolume }) => {
  const values: values = { left: '', right: ''};

  if (!isVolume) {
    values.left = Math.floor(left / 60) + ':' + ((`${(left % 60)}`.length < 2) ? `0${(left % 60)}` : (left % 60)); 
    values.right = Math.floor(right / 60) + ':' + ((`${(right % 60)}`.length < 2) ? `0${(right % 60)}` : (right % 60));
  }

  return (
    <Grid container justifyContent="center" wrap="nowrap">
      <div>{values.left || left}</div>
      <S.InputContainer isVolume={isVolume}>
        <input
          type="range"
          min={0}
          max={right}
          value={left}
          onChange={onChange}
        />
      </S.InputContainer>
      <div>{values.right || right}</div>
    </Grid>
  );
}

export default TrackProgress;