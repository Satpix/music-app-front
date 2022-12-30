import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from './styled';


const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default MainLayout;