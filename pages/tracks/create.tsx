import React from "react";
import { useState } from "react";
import { Button, Grid } from "@mui/material";

import StepWrapper from "components/Track/StepWrapper";
import FileUpload from "components/Upload/FileUpload";
import UploadInfoTrack from "components/Upload/UploadInfoTrack";
import MainLayout from "layouts/MainLayout";
import { useInput } from "hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const router = useRouter();

  const dto = {
    name: useInput(''),
    artist: useInput(''),
    text: useInput(''),
  }

  const goBack = () => {
    setActiveStep(prev => prev - 1);
  }

  const goNext = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData()
      formData.append('name', dto.name.value)
      formData.append('artist', dto.artist.value)
      formData.append('text', dto.text.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/tracks`, formData)
      .then(resp => router.push('/tracks'))
      .catch(e => console.log(e))
    }
  }

  const uploadComponents = {
    0: <UploadInfoTrack values={dto} />,
    1: <FileUpload key="image" setFile={setPicture} accept="image/*" >
      <Button>Загрузить изображение</Button>
    </FileUpload>,
    2: <FileUpload key="audio" setFile={setAudio} accept="audio/*" >
      <Button>Загрузить аудио</Button>
    </FileUpload>,
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        <h1>Загрузка треков</h1>
        {uploadComponents[activeStep]}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={goBack}>Назад</Button>
        <Button onClick={goNext}>Далее</Button>
      </Grid>
    </MainLayout>
  )
}

export default Create;