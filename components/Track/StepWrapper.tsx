import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import * as React from 'react';

interface StepWrapperProps {
  activeStep: number;
  children?: JSX.Element,
}
const steps = ['Track information', 'Upload a cover', 'Upload a track'];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) =>
          <Step
            key={index}
            completed={activeStep > index}
          >
            <StepLabel>
              {step}
            </StepLabel>
          </Step>)}
      </Stepper>
      <Grid container justifyContent="center" sx={{ margin: '70px 0' }}>
        <Card>
          {children}
        </Card>
      </Grid>
    </Container>
  );
}

export default StepWrapper;