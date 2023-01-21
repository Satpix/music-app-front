import * as React from 'react';
import { Grid } from '@mui/material';
import { useRef } from 'react';

interface FileUploadProps {
  setFile: Function,
  accept: string,
  children?: JSX.Element,
}
const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
  const ref = useRef<HTMLInputElement>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  }

  return (
    <Grid container direction={"column"} sx={{ padding: 20 }} onClick={() => ref.current.click()}>
      <input type="file" accept={accept} style={{ display: 'none' }} ref={ref} onChange={onChange} />
      {children}
    </Grid>
  );
}

export default FileUpload;