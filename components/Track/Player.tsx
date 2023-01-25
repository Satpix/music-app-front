import { Pause, PlayArrow, SkipNext, SkipPrevious, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ITrack } from 'types/track';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TrackProgress from './TrackProgress';

import * as S from './styled';

let previosActive: any;

const Player = () => {
  const { pause, volume, active, duration, currentTime, audio } = useTypedSelector(state => state.player)
  const { tracks } = useTypedSelector(state => state.track)

  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setAudio, setActiveTrack } = useActions();

  const onPlay = () => {
    if (pause) {
      playTrack()
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

  const onNext = () => {
    if (active) {
      const currentIndexTrack = tracks.findIndex(track => active?._id === track._id);
      const nextIndexTrack = (currentIndexTrack < tracks.length - 1) ? currentIndexTrack + 1 : 0;
      setActiveTrack(tracks[nextIndexTrack]);
      playTrack();
    }
  }
  
  const onPreview = () => {
    if (active) {
      const currentIndexTrack = tracks.findIndex(track => active?._id === track._id);
      const previousIndexTrack = (currentIndexTrack || tracks.length) - 1;
      setActiveTrack(tracks[previousIndexTrack]);
      playTrack();
    }
  }


  useEffect(() => {
    if (previosActive !== active) {
      if (!audio) {
        setAudio(new Audio());
      } else {
        setActiveAudio();
        audio.play();
      }
      if (active !== null && active !== previosActive) {
        previosActive = active;
      }
    }
  }, [active])

  const setActiveAudio = () => {
    if (active) {
      audio.src = `${process.env.NEXT_PUBLIC_BASE_API}/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
        if(audio.currentTime === audio.duration) {
          onNext();
        }
      }
    }
  }
  if (!active) {
    return null;
  }
  return (
    <S.PlayerContainer>
      <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
        <S.TextName>{active?.name}</S.TextName>
        <S.TextArtist>{active?.artist}</S.TextArtist>
      </Grid>
      <Grid container direction="column" wrap="nowrap" justifyContent="center" alignItems="center" sx={{ width: 'calc(90vw - 550px)' }}>
        <Grid container direction="row" justifyContent="center">
          <Tooltip title="Previous">
            <IconButton onClick={onPreview}>
              <SkipPrevious />
            </IconButton>
          </Tooltip>
          <Tooltip title={pause ? "Play" : "Pause"}>
            <IconButton onClick={onPlay}>
              {pause
                ? <PlayArrow />
                : <Pause />
              }
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton onClick={onNext}>
              <SkipNext />
            </IconButton>
          </Tooltip>
        </Grid>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} isVolume={false} />
      </Grid>
      <Grid container direction="row" wrap="nowrap" justifyContent="space-between" alignItems="center" sx={{ width: '250px' }}>
        <VolumeUp style={{ marginLeft: 'auto' }} />
        <TrackProgress left={volume} right={100} onChange={changeVolume} isVolume />
      </Grid>
    </S.PlayerContainer>
  );
}

export default Player;