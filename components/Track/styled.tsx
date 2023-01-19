import { Card } from "@mui/material";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 20px;
`;

export const TextName = styled.div`
`;

export const TextArtist = styled.div`
  font-size: 12px;
  color: gray;
`;

export const Image  =  styled.img`
  width: 70px;
  height: 70px;
`;

export const PlayerContainer = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: lightgray;
`;
