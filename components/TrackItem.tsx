import { Pause, PlayArrow } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import * as React from 'react';
import { ITrack } from 'types/track';

import { CardContainer, Image } from './styled';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  return (
    <CardContainer>
      <IconButton>
        {active
          ? <PlayArrow />
          : <Pause />
        }
      </IconButton>
      <Image src={track.picture} alt={track.name}/>
      <Grid container direction="column" styled={{width: 200, margin: '0 20px'}}>
        <div>{track.name}</div>
      </Grid>
    </CardContainer>
  );
}

export default TrackItem;