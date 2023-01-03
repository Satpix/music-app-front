import { Box, Button, Card, Grid } from '@mui/material';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from 'components/TrackList';

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {id: '1', name: 'Трек 1', artist: 'Артист 1', text: 'Текст 1', listens: 2, audio: 'http://localhost:5003/audio/12b13055-d7b4-4a6b-b3cf-79961d688291.mp3', picture: 'http://localhost:5003/image/08cba8ac-e4eb-4e26-8d6d-0d0e16658480.jpeg', comments: []},
    {id: '2', name: 'Трек 2', artist: 'Артист 2', text: 'Текст 2', listens: 5, audio: 'http://localhost:5003/audio/12b13055-d7b4-4a6b-b3cf-79961d688291.mp3', picture: 'http://localhost:5003/image/08cba8ac-e4eb-4e26-8d6d-0d0e16658480.jpeg', comments: []},
    {id: '3', name: 'Трек 3', artist: 'Артист 3', text: 'Текст 3', listens: 12, audio: 'http://localhost:5003/audio/12b13055-d7b4-4a6b-b3cf-79961d688291.mp3', picture: 'http://localhost:5003/image/08cba8ac-e4eb-4e26-8d6d-0d0e16658480.jpeg', comments: []},
  ]
  return (
    <MainLayout>
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