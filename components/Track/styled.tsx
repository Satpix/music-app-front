import { Card } from "@mui/material";
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
  direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #eeeeee;
  // background-color: ${({ theme }) => theme.colors.primaryBlue}
`;

export const InputContainer = styled.div`
  margin: 0 auto;
  width: 'none';
  margin: -2px 10px 0px 10px;
  width: ${({ isVolume }) => isVolume ? 'calc(20vw - 100px)' : 'calc(70vw - 200px)'};
`;