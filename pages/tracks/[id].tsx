import { Box, Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import MainLayout from 'layouts/MainLayout';
import { ITrack } from 'types/track';

import { Image } from './styled';
import axios from 'axios';
import { useInput } from 'hooks/useInput';
import { GetServerSideProps } from 'next';

interface TrackPageProps {
  serverTrack: ITrack,
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {

  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');
  const addComment = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/tracks/comment`, {
        username: username.value,
        text: text.value,
        trackId: track._id,
      })
      setTrack({ ...track, comments: [...track.comments, response.data]})
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <MainLayout>
      <Button onClick={() => { router.push('/tracks') }}
        variant={"outline"}
        sx={{ fontSize: 32 }}
      >
        К списку
      </Button>
      <Grid container sx={{ margin: '20px 0px' }}>
        <Image src={`${process.env.NEXT_PUBLIC_BASE_API}/${track.picture}`} alt="" />
        <Box ml={3}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </Box>
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField
          label="Ваше Имя"
          fullWidth
          {...username}
        />
        <TextField
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          {...text}
        />
        <Button onClick={addComment}>Отправить</Button>
        <div>
          {track.comments.map(comment =>
            <div>
              <div>Автор - {comment.username}</div>
              <div>Комментарий - {comment.text}</div>
            </div>
          )}
        </div>
      </Grid>
    </MainLayout>
  );
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/tracks/` + params.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}