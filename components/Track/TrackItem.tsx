import { Pause, PlayArrow, Delete } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ITrack } from 'types/track';
import { useActions } from '../../hooks/useActions';

import { CardContainer, Image, TextName, TextArtist } from './styled';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter()
  const {playTrack, pauseTrack, setActiveTrack} = useActions()

  const play = (e) => {
      e.stopPropagation()
      console.log(track);
      setActiveTrack(track)
      pauseTrack()
  }

  return (
    <CardContainer onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={play}>
        {!active
          ? <PlayArrow />
          : <Pause />
        }
      </IconButton>
      <Image src={`${process.env.NEXT_PUBLIC_BASE_API}/${track.picture}`} alt={track.name || 'Image'} />
      <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
        <TextName>{track.name}</TextName>
        <TextArtist>{track.artist}</TextArtist>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton style={{ marginLeft: 'auto' }}>
        <Delete onClick={e => e.stopPropagation()} />
      </IconButton>
    </CardContainer>
  );
}

export default TrackItem;