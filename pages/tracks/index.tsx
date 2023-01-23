import { Box, Button, Card, Grid, TextField } from '@mui/material';
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

const Index = () => {
  const router = useRouter();

  const { tracks, error } = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch() as NextThunkDispatch;


  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    )
  }

  if (error) {
    return <MainLayout title='Error - music app'>
      <h1>{error}</h1>
    </MainLayout>
  }
  console.log(tracks)

  return (
    <MainLayout title='List of tracks - music app'>
      <S.Container>
        <Card sx={{ width: '90vw', maxHeight: '80vh' }}>
          <Box p={4}>
            <Grid container justifyContent="space-between" alignItems="center">
              <h1>Track list</h1>
              <Button variant="outlined" onClick={() => router.push('/tracks/create')}>Upload</Button>
            </Grid>
            <TextField
              fullWidth
              value={query}
              onChange={onSearch}
              label="Search"
              variant="outlined"
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
