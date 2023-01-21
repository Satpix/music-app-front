import { Box, Button, Card, Grid } from '@mui/material';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { ITrack } from 'types/track';
import TrackList from 'components/Track/TrackList';
import { fetchTracks } from '../../store/actions-creators/track';
import { NextThunkDispatch, wrapper } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Index = () => {
  const router = useRouter();

  const { tracks, error } = useTypedSelector(state => state.track);

  if (error) {
    return <MainLayout title='Error - music app'>
      <h1>{error}</h1>
    </MainLayout>
  }
  console.log(tracks)

  return (
    <MainLayout title='List of tracks - music app'>
      <Grid container justifyContent="center">
        <Card sx={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(
//   store => async ({ req, res, ...etc }) =>
//   {
//       const dispatch = store.dispatch as NextThunkDispatch;
//       await dispatch(fetchTracks());

//       return { props: {} }
//   }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());

    return { props: {} }
  }
);
