import { Grid } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Grid).attrs({
  container: true,
  justifyContent: "center",
  height: 'calc(100vh - 154px)',
})`
  overflow-y: auto;
`;

export const TrackTitle = styled.h1`
  margin: 0 0 10px 0;
  padding: 0px;
  line-height: 1.2;
`;

export const UploadTitle = styled.h1`
  text-align: center;
`;