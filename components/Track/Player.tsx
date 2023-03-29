import { Pause, PlayArrow, SkipNext, SkipPrevious, Speed, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TrackProgress from './TrackProgress';

import * as S from './styled';
import SimpleDialogWithCircles from '../Dialogs/SimpleDialogWithCircles';
import { transformToAudioVolumeFormat } from './helpers';

let previosActive: any;

const Player = () => {
  const { pause, volume, active, duration, currentTime, audio } = useTypedSelector(state => state.player)
  const { tracks } = useTypedSelector(state => state.track)
  const [openSpeedDialog, setOpenSpeedDialog] = useState(false);
  const speedList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  const [selectedSpeedValue, setSelectedSpeedValue] = useState(speedList[2]);

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
    audio.volume = transformToAudioVolumeFormat(Number(e.target.value));
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
      audio.volume = transformToAudioVolumeFormat(volume);
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
        if (audio.currentTime === audio.duration) {
          onNext();
        }
      }
    }
  }

  const handleClose = (value: number) => {
    setOpenSpeedDialog(false);
    setSelectedSpeedValue(value);
    audio.playbackRate = value;
  };

  const handleClickOpen = () => {
    setOpenSpeedDialog(true);
  };

  if (!active) {
    return null;
  }
  return (
    <S.PlayerContainer>
      <S.TrackInfo>
        <S.TextName>{active?.name}</S.TextName>
        <S.TextArtist>{active?.artist}</S.TextArtist>
      </S.TrackInfo>
      <S.ProgressContainer isVolume={false}>
        <Grid container direction="row" justifyContent="center">
          <Tooltip title="Speed">
            <IconButton onClick={handleClickOpen}>
              <Speed />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous">
            <IconButton onClick={onPreview}>
              <SkipPrevious />
            </IconButton>
          </Tooltip>
          <Tooltip title={pause ? "Play" : "Pause"}>
            <IconButton onClick={onPlay}>
              {pause
                ? <PlayArrow fontSize="large" />
                : <Pause fontSize="large" />
              }
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton onClick={onNext}>
              <SkipNext />
            </IconButton>
          </Tooltip>
          <Tooltip title="Speed">
            <IconButton onClick={handleClickOpen}>
              <Speed />
            </IconButton>
          </Tooltip>
        </Grid>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} isVolume={false} />
      </S.ProgressContainer>
      <S.ProgressContainer isVolume>
        <Tooltip title="Mute">
          <IconButton>
            <VolumeUp style={{ marginLeft: 'auto' }} sx={{ marginTop: '-8px' }} />
          </IconButton>
        </Tooltip>
        <TrackProgress left={volume} right={100} onChange={changeVolume} isVolume />
      </S.ProgressContainer>
      <SimpleDialogWithCircles
        selectedValue={selectedSpeedValue}
        array={speedList}
        open={openSpeedDialog}
        onClose={handleClose}
      />
    </S.PlayerContainer >
  );
}

export default Player;