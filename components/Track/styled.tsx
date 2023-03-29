import { Card, Grid } from "@mui/material";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 16px;
`;

export const TextName = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const TextArtist = styled(TextName)`
  font-size: 12px;
  color: gray;
`;

export const Image = styled.img`
  width: 70px;
  height: 70px;
`;

export const PlayerContainer = styled.div`
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  wrap:nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #eeeeee;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    background-color: #cccccc;
    height: 200px;
  }
  // background-color: ${({ theme }) => theme.colors.primaryBlue}
`;

interface Volume {
  isVolume: boolean,
}

export const InputContainer = styled.div<Volume>`
  margin: 0 auto;
  margin: -2px 10px 0px 10px;
  width: ${({ isVolume }) => isVolume ? 'calc(20vw - 140px)' : 'calc(70vw - 200px)'};

  @media screen and (max-width: 1000px) {
    width: ${({ isVolume }) => isVolume ? 'calc(30vw - 140px)' : 'calc(55vw - 200px)'};
  }

  @media screen and (max-width: 600px) {
    width: ${({ isVolume }) => isVolume ? 'calc(50vw - 140px)' : 'calc(100vw - 200px)'};
  }
`;



export const ProgressContainer = styled(Grid).attrs<Volume>(
  ({ theme, isVolume }) => ({
    container: true,
    direction: !isVolume ? "column" : "raw",
    wrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    sx: { color: theme.colors.primaryBlack },
  })) <Volume>`
  width: ${({ isVolume }) => isVolume ? '20vw' : 'calc(70vw - 100px)'};

  @media screen and (max-width: 1000px) {
    width: ${({ isVolume }) => isVolume ? '30vw' : 'calc(55vw - 100px)'};
  }

  @media screen and (max-width: 600px) {
    width: ${({ isVolume }) => isVolume ? '50vw' : 'calc(100vw)'};
  }
`;

export const TrackInfo = styled(Grid).attrs({
  container: true,
  direction: "column",
  sx: { margin: '0 20px' },
})`
  width: 10vw;

  @media screen and (max-width: 1000px) {
    width: 15vw;
  }

  @media screen and (max-width: 600px) {
    text-align: center;
    width: 100vw;
  }

`;