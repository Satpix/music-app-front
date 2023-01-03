import { Card } from "@mui/material";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 20px;
`;

export const Image  =  styled.img.attrs(({ item }) => ({ item }))`
  width: 70px;
  height: 70px;
`;

