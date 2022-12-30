import React from 'react';
import Navbar from "../components/Navbar"
import MainLayout from '../layouts/MainLayout';

import { MainContainer, Text } from './styled';

const Index = () => {
  return (
    <MainContainer>
      <MainLayout>
        <Text>
          Главная страница
        </Text>
        <Text>
          Треки
        </Text>
      </MainLayout>
    </MainContainer>
  )
}

export default Index;