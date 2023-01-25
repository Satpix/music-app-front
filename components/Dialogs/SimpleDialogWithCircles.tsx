import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number;
  array: Array<number>;
  onClose: (value: number) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, array } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: number) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ bottom: '70px', top: 'auto' }} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogTitle textAlign='center'>Setup audio speed</DialogTitle>
      <Grid container wrap="nowrap">
        {array.map((speed) => (
          <ListItemButton onClick={() => handleListItemClick(speed)} key={speed}>
            <Avatar onClick={() => handleListItemClick(speed)} key={speed} sx={{ bgcolor: blue[100], color: selectedValue === speed ? 'black' : blue[900], width: '50px', height: '50px' }}>
              {speed}
            </Avatar>
          </ListItemButton>
        ))}
      </Grid>
    </Dialog >
  );
}

export default SimpleDialog;
