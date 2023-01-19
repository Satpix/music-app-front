import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { ITrack } from 'types/track';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TextArtist, TextName, PlayerContainer } from './styled';
import TrackProgress from './TrackProgress';

let audio: HTMLAudioElement;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions();

  const onPlay = (e) => {
    if (pause) {
      playTrack()
      audio.pause();
      audio.play();

    } else {
      pauseTrack()
      audio.pause();
    }
  }
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = (Number(e.target.value)) / 100;
    setVolume(Number(e.target.value));
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = (Number(e.target.value));
    setCurrentTime(Number(e.target.value));
  }
  
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
      setAudio();
    } else {
      setAudio();
      onPlay;
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = `${process.env.NEXT_PUBLIC_BASE_API}/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }
  if (!active) {
    return null;
  }
  return (
    <PlayerContainer>
      <IconButton onClick={onPlay}>
        {pause
          ? <PlayArrow />
          : <Pause />
        }
      </IconButton>
      <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
        <TextName>{active?.name}</TextName>
        <TextArtist>{active?.artist}</TextArtist>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </PlayerContainer>
  );
}

export default Player;