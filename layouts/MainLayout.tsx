import Player from 'components/Track/Player';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from './styled';

interface MainLayoutProps {
  title?: string;
  children?: JSX.Element,
  keywords?: string,
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, title, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || 'Music app'}</title>
        <meta name="description" content='Music plarform where you can listening differents tracks' />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'Music, track, plarform, app, listen, artist'} />
        <meta name="viewport" content='width=device=width, initial-scale=1'/>
      </Head>
      <Navbar />
      <Container>
        {children}
      </Container>
      <Player />
    </>
  )
}

export default MainLayout;