import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { ITrack } from 'types/track';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TrackProgress from './TrackProgress';

import * as S from './styled';

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
    <S.PlayerContainer>
      <Grid container direction="row" sx={{ width: "300px"}}>
        <Tooltip title={pause ? "Play" : "Pause"}>
          <IconButton onClick={onPlay}>
            {pause
              ? <PlayArrow />
              : <Pause />
            }
          </IconButton>
        </Tooltip>
        <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
          <S.TextName>{active?.name}</S.TextName>
          <S.TextArtist>{active?.artist}</S.TextArtist>
        </Grid>
      </Grid>
      <Grid container direction="row" wrap="nowrap" justifyContent="center" alignItems="center" sx={{ width: 'calc(90vw - 550px)' }}>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      </Grid>
      <Grid container direction="row" wrap="nowrap" justifyContent="space-between" alignItems="center" sx={{ width: '250px' }}>
        <VolumeUp style={{ marginLeft: 'auto' }} />
        <TrackProgress left={volume} right={100} onChange={changeVolume} isVolume />
      </Grid>
    </S.PlayerContainer>
  );
}

export default Player;