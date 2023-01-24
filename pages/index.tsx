import React from 'react';
import Navbar from "../components/Navbar"
import MainLayout from '../layouts/MainLayout';

import { MainContainer, Text } from './styled';

const Index = () => {
  return (
    <MainContainer>
      <MainLayout title='Main page - music app'>
        <Text>
          Main page
        </Text>
        <Text>
          Tracks
        </Text>
      </MainLayout>
    </MainContainer>
  )
}

export default Index;