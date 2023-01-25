import { Grid, Slider } from '@mui/material';
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
  const values: values = { left: '', right: '' };

  if (!isVolume) {
    values.left = Math.floor(left / 60) + ':' + ((`${(left % 60)}`.length < 2) ? `0${(left % 60)}` : (left % 60));
    values.right = Math.floor(right / 60) + ':' + ((`${(right % 60)}`.length < 2) ? `0${(right % 60)}` : (right % 60));
  }

  return (
    <Grid container justifyContent="center" wrap="nowrap">
      <div>{values.left || left}</div>
      <S.InputContainer isVolume={isVolume}>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={left}
          min={0}
          step={1}
          max={right}
          onChange={onChange}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: 18,
              height: 18,
              backgroundColor: '#fff',
              '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
      </S.InputContainer>
      <div>{values.right || right}</div>
    </Grid>
  );
}

export default TrackProgress;