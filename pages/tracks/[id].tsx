import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GetServerSideProps } from 'next';

import MainLayout from 'layouts/MainLayout';
import { ITrack } from 'types/track';
import { useInput } from 'hooks/useInput';

import * as S from './styled';
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
      setTrack({ ...track, comments: [...track.comments, response.data] })
    } catch (e) {
      console.log(e);
    }
  }

  const loaderApiImage = () => {
    return `${process.env.NEXT_PUBLIC_BASE_API}/${track.picture}`;
  }
  return (
    <MainLayout title={'Music app - ' + track.name + ' - ' + track.artist} keywords={'Music' + track.name + track.artist}>
      <Box p={4}>

        <Button 
          startIcon={<ArrowBackIosNew />} 
          onClick={() => { router.push('/tracks') }}
          sx={{ fontSize: 24, width: '210px' }}
          variant="contained"
        >
          Back
        </Button>
        <Grid container direction="row" wrap="nowrap" sx={{ margin: '20px 0px' }}>
          {track?.picture ?
            <Image loader={loaderApiImage} src={`${process.env.NEXT_PUBLIC_BASE_API}/${track.picture}`} alt={track.name} width={210} height={210} />
            :
            <Image src='/../public/track_picture.png' alt={track.name} width={210} height={210} />
          }
          <Box ml={4} sx={{ height: '210px', overflow: 'auto' }}>
            <S.TrackTitle>Name - {track.name}</S.TrackTitle>
            <S.TrackTitle>Artist - {track.artist}</S.TrackTitle>
            <S.TrackTitle>Auditions - {track.listens}</S.TrackTitle>
          </Box>
        </Grid>
        {track.text ? (
          <>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
          </>
        ) : null}
        <h1>Комментарии</h1>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            label="Ваше Имя"
            fullWidth
            sx={{ marginBottom: 1 }}
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
            {track.comments?.map(comment =>
              <div>
                <div>Автор - {comment.username}</div>
                <div>Комментарий - {comment.text}</div>
              </div>
            )}
          </div>
        </Grid>
      </Box>
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