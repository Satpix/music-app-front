import { Pause, PlayArrow, Delete } from '@mui/icons-material';
import { Grid, Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useActions } from 'hooks/useActions';
import { deleteTracks } from 'store/actions-creators/track';
import { NextThunkDispatch } from 'store/index';
import { ITrack } from 'types/track';

import { CardContainer, TextName, TextArtist } from './styled';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useEffect } from 'react';
import { useState } from 'react';

interface TrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter()
  const { playTrack, pauseTrack, setActiveTrack } = useActions()
  const [ isActive, setIsActive ] = useState(false);
  const dispatch = useDispatch() as NextThunkDispatch;

  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(await deleteTracks(track._id));
  }

  const play = (e) => {
    e.stopPropagation()
    setActiveTrack(track)
    pauseTrack()
  }

  const { active } = useTypedSelector(state => state.player)

  const loaderApiImage = () => {
    return `${process.env.NEXT_PUBLIC_BASE_API}/${track?.picture}`;
  }

  useEffect(() => {
    if (active?._id === track._id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [active])

  return (
    <CardContainer onClick={() => router.push('/tracks/' + track._id)}>
      <Tooltip title={isActive ? "Pause" : "Play"}>
        <IconButton onClick={(e) => play(e)}>
          {!isActive
            ? <PlayArrow />
            : <Pause />
          }
        </IconButton>
      </Tooltip>
      {track?.picture ?
        <Image loader={loaderApiImage} src={`${process.env.NEXT_PUBLIC_BASE_API}/${track?.picture}`} alt={track.name} width={50} height={50} />
        :
        <Image src='/../public/track_picture.png' alt={track.name} width={50} height={50} />
      }
      <Grid container direction="column" sx={{ maxWidth: 'calc(90vw - 260px)', margin: '0 20px' }}>
        <TextName>{track.name}</TextName>
        <TextArtist>{track.artist}</TextArtist>
      </Grid>
      <IconButton sx={{ marginLeft: 'auto' }}>
        <Delete onClick={e => handleDelete(e)} />
      </IconButton>
    </CardContainer>
  );
}

export default TrackItem;