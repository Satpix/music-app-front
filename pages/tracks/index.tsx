import { Box, Button, Card, Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { ITrack } from 'types/track';
import TrackList from 'components/Track/TrackList';
import { fetchTracks, searchTracks } from '../../store/actions-creators/track';
import { NextThunkDispatch, wrapper } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

import * as S from './styled';
import { Close } from '@mui/icons-material';
import { StyledLink } from 'components/Link';

const Index = () => {

  const { tracks, error } = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch() as NextThunkDispatch;


  const SearchTracksByTimer = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchTracks(value));
      }, 500)
    )
  }

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    SearchTracksByTimer(e.target.value);
  }

  const handleClickCancel = () => {
    setQuery('');
    SearchTracksByTimer('');
  }

  const handleMouseDownCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (error) {
    return <MainLayout title='Error - music app'>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title='List of tracks - music app'>
      <S.Container>
        <Card sx={{ width: '90vw', maxHeight: '80vh' }}>
          <Box p={4}>
            <Grid container justifyContent="space-between" alignItems="center">
              <h1>Track list</h1>
              <StyledLink href={'/tracks/create'}>
                <Button variant="outlined">Upload</Button>
              </StyledLink>
            </Grid>
            <TextField
              fullWidth
              value={query}
              onChange={onSearch}
              label="Search"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickCancel}
                    onMouseDown={handleMouseDownCancel}
                    edge="end"
                  >
                    {query ? <Close /> : null}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </S.Container>
    </MainLayout>
  )
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());

    return { props: {} }
  }
);
